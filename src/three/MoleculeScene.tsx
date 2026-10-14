import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceTier } from './useDeviceTier';
import {
  computeHydrogenBonds,
  calculatePointerAttraction,
  getWaterGeometryOffsets,
  type Vector3D,
} from './bondLogic';

interface MoleculeState {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rot: THREE.Euler;
  rotSpeed: THREE.Vector3;
  basePos: THREE.Vector3;
}

function MolecularLattice({
  count,
  isPaused,
  isDark,
}: {
  count: number;
  isPaused: boolean;
  isDark: boolean;
}) {
  const { viewport } = useThree();

  const oxygenInstancedRef = useRef<THREE.InstancedMesh>(null!);
  const hydrogenInstancedRef = useRef<THREE.InstancedMesh>(null!);
  const bondsGeometryRef = useRef<THREE.BufferGeometry>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => getWaterGeometryOffsets(0.65, 104.5), []);

  // Initialize molecular system states
  const molecules = useMemo<MoleculeState[]>(() => {
    const list: MoleculeState[] = [];
    const spreadX = 14;
    const spreadY = 8;
    const spreadZ = 7;

    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY,
        (Math.random() - 0.5) * spreadZ
      );
      list.push({
        pos,
        basePos: pos.clone(),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.006
        ),
        rot: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
      });
    }
    return list;
  }, [count]);

  // Max potential bonds allocation for dynamic buffer
  const maxPossibleBonds = count * 4;
  const bondPositions = useMemo(() => new Float32Array(maxPossibleBonds * 6), [maxPossibleBonds]);

  // Track pointer and touch in 3D world units with smooth interpolation
  const pointerWorld = useRef({ x: 0, y: 0 });
  const currentAttractor = useRef({ x: 0, y: 0 });
  const idleTime = useRef(0);
  const touchState = useRef<{ active: boolean; x: number; y: number }>({
    active: false,
    x: 0,
    y: 0,
  });

  // Global touch listener so touches anywhere on mobile interact with the simulation
  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch) {
          const normX = (touch.clientX / window.innerWidth) * 2 - 1;
          const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
          touchState.current = { active: true, x: normX, y: normY };
        }
      }
    };

    const handleTouchEnd = () => {
      touchState.current.active = false;
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  useFrame((state, delta) => {
    if (isPaused) return;

    idleTime.current += delta;

    let targetNormX = state.pointer.x;
    let targetNormY = state.pointer.y;

    if (touchState.current.active) {
      targetNormX = touchState.current.x;
      targetNormY = touchState.current.y;
    } else if (Math.abs(state.pointer.x) < 0.001 && Math.abs(state.pointer.y) < 0.001) {
      // Autonomous organic drift when idle on touch devices
      targetNormX = Math.sin(idleTime.current * 0.8) * 0.45;
      targetNormY = Math.cos(idleTime.current * 0.6) * 0.35;
    }

    const targetWorldX = (targetNormX * viewport.width) / 2;
    const targetWorldY = (targetNormY * viewport.height) / 2;

    // Smooth spring lerp for force field attractor
    currentAttractor.current.x += (targetWorldX - currentAttractor.current.x) * 0.12;
    currentAttractor.current.y += (targetWorldY - currentAttractor.current.y) * 0.12;
    pointerWorld.current = currentAttractor.current;

    const scrollY = window.scrollY || 0;
    const scrollFactor = Math.min(scrollY / 600, 1.5);

    // Scroll dolly camera
    state.camera.position.z = 10 + scrollFactor * 4;
    state.camera.position.y = -scrollFactor * 2;

    const positionsList: Vector3D[] = [];

    // Update simulation
    molecules.forEach((mol, idx) => {
      // Brownian motion drift
      mol.pos.add(mol.vel);
      mol.rot.x += mol.rotSpeed.x;
      mol.rot.y += mol.rotSpeed.y;
      mol.rot.z += mol.rotSpeed.z;

      // Soft boundary reflection
      if (Math.abs(mol.pos.x) > 8) mol.vel.x *= -1;
      if (Math.abs(mol.pos.y) > 5) mol.vel.y *= -1;
      if (Math.abs(mol.pos.z) > 4) mol.vel.z *= -1;

      // Touch and pointer interactive attraction with enhanced responsiveness
      const attractionForce = touchState.current.active ? 0.045 : 0.024;
      const attractionRadius = touchState.current.active ? 6.5 : 4.8;
      const attraction = calculatePointerAttraction(
        { x: mol.pos.x, y: mol.pos.y, z: mol.pos.z },
        pointerWorld.current,
        attractionRadius,
        attractionForce
      );
      mol.pos.x += attraction.x;
      mol.pos.y += attraction.y;

      // Disperse with scroll
      if (scrollFactor > 0.1) {
        mol.pos.x += (mol.pos.x > 0 ? 1 : -1) * scrollFactor * 0.03;
      }

      positionsList.push({ x: mol.pos.x, y: mol.pos.y, z: mol.pos.z });

      // Update Oxygen Instance
      dummy.position.copy(mol.pos);
      dummy.rotation.copy(mol.rot);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      oxygenInstancedRef.current.setMatrixAt(idx, dummy.matrix);

      // Update Hydrogen Instances (2 per molecule)
      const h1Local = new THREE.Vector3(
        offsets.hydrogen1.x,
        offsets.hydrogen1.y,
        offsets.hydrogen1.z
      );
      h1Local.applyEuler(mol.rot).add(mol.pos);
      dummy.position.copy(h1Local);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      hydrogenInstancedRef.current.setMatrixAt(idx * 2, dummy.matrix);

      const h2Local = new THREE.Vector3(
        offsets.hydrogen2.x,
        offsets.hydrogen2.y,
        offsets.hydrogen2.z
      );
      h2Local.applyEuler(mol.rot).add(mol.pos);
      dummy.position.copy(h2Local);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      hydrogenInstancedRef.current.setMatrixAt(idx * 2 + 1, dummy.matrix);
    });

    oxygenInstancedRef.current.instanceMatrix.needsUpdate = true;
    hydrogenInstancedRef.current.instanceMatrix.needsUpdate = true;

    // Calculate dynamic hydrogen bonding lines
    const activeBonds = computeHydrogenBonds(positionsList, 1.2, 3.2, 3);
    let lineVertIdx = 0;

    for (let b = 0; b < activeBonds.length; b++) {
      const bond = activeBonds[b];
      if (!bond) continue;
      const posA = positionsList[bond.sourceIndex];
      const posB = positionsList[bond.targetIndex];
      if (!posA || !posB) continue;

      if (lineVertIdx + 6 <= bondPositions.length) {
        bondPositions[lineVertIdx++] = posA.x;
        bondPositions[lineVertIdx++] = posA.y;
        bondPositions[lineVertIdx++] = posA.z;
        bondPositions[lineVertIdx++] = posB.x;
        bondPositions[lineVertIdx++] = posB.y;
        bondPositions[lineVertIdx++] = posB.z;
      }
    }

    if (bondsGeometryRef.current) {
      const posAttr = bondsGeometryRef.current.attributes.position;
      if (posAttr) {
        posAttr.needsUpdate = true;
        bondsGeometryRef.current.setDrawRange(0, lineVertIdx / 3);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 1.2 : 1.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={isDark ? 1.5 : 1.6}
        color={isDark ? '#00D2FF' : '#B45309'}
      />
      <pointLight
        position={[-10, -5, -5]}
        intensity={isDark ? 1.2 : 1.4}
        color={isDark ? '#2563EB' : '#0F3B66'}
      />
      <pointLight
        position={[pointerWorld.current.x, pointerWorld.current.y, 2.5]}
        intensity={touchState.current.active ? (isDark ? 3.0 : 3.2) : isDark ? 1.8 : 2.0}
        color={isDark ? '#38BDF8' : '#D97706'}
        distance={7}
      />

      {/* Instanced Central Oxygen Atoms */}
      <instancedMesh ref={oxygenInstancedRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshStandardMaterial
          color={isDark ? '#00D2FF' : '#0F3B66'}
          emissive={isDark ? '#0047AB' : '#0A2540'}
          emissiveIntensity={isDark ? 0.6 : 0.35}
          roughness={isDark ? 0.15 : 0.2}
          metalness={isDark ? 0.6 : 0.4}
        />
      </instancedMesh>

      {/* Instanced Satellite Hydrogen Atoms */}
      <instancedMesh ref={hydrogenInstancedRef} args={[undefined, undefined, count * 2]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial
          color={isDark ? '#F8FAFC' : '#B45309'}
          emissive={isDark ? '#38BDF8' : '#D97706'}
          emissiveIntensity={isDark ? 0.3 : 0.25}
          roughness={0.2}
          metalness={0.4}
        />
      </instancedMesh>

      {/* Dynamic Hydrogen Bonds (Dashed / Translucent lines) */}
      <lineSegments>
        <bufferGeometry ref={bondsGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={bondPositions.length / 3}
            array={bondPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineDashedMaterial
          color={isDark ? '#38BDF8' : '#B45309'}
          transparent
          opacity={isDark ? 0.45 : 0.4}
          dashSize={0.2}
          gapSize={0.15}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export const MoleculeScene: React.FC = () => {
  const { particleCount, maxDpr } = useDeviceTier();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Pause when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsPaused(!entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, maxDpr]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <MolecularLattice count={particleCount} isPaused={isPaused} isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default MoleculeScene;
