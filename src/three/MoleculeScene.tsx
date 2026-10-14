import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceTier } from './useDeviceTier';
import {
  computeHydrogenBonds,
  calculatePointerAttraction,
  calculateStericRepulsion,
  calculateVortexForce,
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
  const lastTouch = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const touchVelocity = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });

  // Global touch listener with swipe velocity calculation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch) {
          const normX = (touch.clientX / window.innerWidth) * 2 - 1;
          const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
          touchState.current = { active: true, x: normX, y: normY };
          lastTouch.current = { x: normX, y: normY, time: performance.now() };
          touchVelocity.current = { vx: 0, vy: 0 };
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch) {
          const normX = (touch.clientX / window.innerWidth) * 2 - 1;
          const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
          const now = performance.now();
          const dt = Math.max(0.005, (now - lastTouch.current.time) / 1000);
          touchVelocity.current = {
            vx: ((normX - lastTouch.current.x) / dt) * 0.1,
            vy: ((normY - lastTouch.current.y) / dt) * 0.1,
          };
          lastTouch.current = { x: normX, y: normY, time: now };
          touchState.current = { active: true, x: normX, y: normY };
        }
      }
    };

    const handleTouchEnd = () => {
      touchState.current.active = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
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
      // Autonomous organic drift when idle
      targetNormX = Math.sin(idleTime.current * 0.7) * 0.4;
      targetNormY = Math.cos(idleTime.current * 0.5) * 0.3;
    }

    const targetWorldX = (targetNormX * viewport.width) / 2;
    const targetWorldY = (targetNormY * viewport.height) / 2;

    // Smooth spring lerp for force field probe
    currentAttractor.current.x += (targetWorldX - currentAttractor.current.x) * 0.16;
    currentAttractor.current.y += (targetWorldY - currentAttractor.current.y) * 0.16;
    pointerWorld.current = currentAttractor.current;

    // Fluid drag velocity decay
    touchVelocity.current.vx *= 0.92;
    touchVelocity.current.vy *= 0.92;

    const scrollY = window.scrollY || 0;
    const scrollFactor = Math.min(scrollY / 600, 1.5);

    // Scroll dolly camera
    state.camera.position.z = 10 + scrollFactor * 4;
    state.camera.position.y = -scrollFactor * 2;

    // Pairwise Steric Repulsion preventing ANY clumping or coagulation
    for (let i = 0; i < molecules.length; i++) {
      const molA = molecules[i]!;
      for (let j = i + 1; j < molecules.length; j++) {
        const molB = molecules[j]!;
        const rep = calculateStericRepulsion(molA.pos, molB.pos, 1.85, 0.024);
        molA.vel.x += rep.x;
        molA.vel.y += rep.y;
        molA.vel.z += rep.z;
        molB.vel.x -= rep.x;
        molB.vel.y -= rep.y;
        molB.vel.z -= rep.z;
      }
    }

    const positionsList: Vector3D[] = [];

    // Update simulation
    molecules.forEach((mol, idx) => {
      // Viscous liquid damping
      mol.vel.multiplyScalar(0.965);

      // Thermal fluctuations (Brownian motion)
      mol.vel.x += (Math.random() - 0.5) * 0.0012;
      mol.vel.y += (Math.random() - 0.5) * 0.0012;
      mol.vel.z += (Math.random() - 0.5) * 0.0008;

      // Integrate position
      mol.pos.add(mol.vel);
      mol.rot.x += mol.rotSpeed.x;
      mol.rot.y += mol.rotSpeed.y;
      mol.rot.z += mol.rotSpeed.z;

      // Soft boundary restoring force
      if (Math.abs(mol.pos.x) > 7.5) mol.vel.x -= Math.sign(mol.pos.x) * 0.015;
      if (Math.abs(mol.pos.y) > 4.8) mol.vel.y -= Math.sign(mol.pos.y) * 0.015;
      if (Math.abs(mol.pos.z) > 3.8) mol.vel.z -= Math.sign(mol.pos.z) * 0.015;

      // Anti-coagulation Probe Field:
      // minCoreRadius pushes OUTWARD right under probe (cavity formation)
      // intermediate shell stabilizes into an active solvation ring
      const influenceRadius = touchState.current.active ? 6.0 : 4.5;
      const attractionIntensity = touchState.current.active ? 0.038 : 0.018;
      const minCoreRadius = touchState.current.active ? 2.2 : 1.5;

      const pForce = calculatePointerAttraction(
        mol.pos,
        pointerWorld.current,
        influenceRadius,
        attractionIntensity,
        minCoreRadius
      );
      mol.vel.x += pForce.x;
      mol.vel.y += pForce.y;

      // Hydrodynamic vortex swirl: creates fluid streamlines around probe
      const vortex = calculateVortexForce(
        mol.pos,
        pointerWorld.current,
        influenceRadius,
        touchState.current.active ? 0.024 : 0.012
      );
      mol.vel.x += vortex.x;
      mol.vel.y += vortex.y;

      // Swipe / gesture momentum impulse (stirring fluid in touch direction)
      if (
        touchState.current.active &&
        (Math.abs(touchVelocity.current.vx) > 0.005 || Math.abs(touchVelocity.current.vy) > 0.005)
      ) {
        const dx = mol.pos.x - pointerWorld.current.x;
        const dy = mol.pos.y - pointerWorld.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < influenceRadius) {
          const impulse = (1 - d / influenceRadius) * 0.08;
          mol.vel.x += touchVelocity.current.vx * impulse;
          mol.vel.y += touchVelocity.current.vy * impulse;
          mol.rotSpeed.z += (touchVelocity.current.vx * dy - touchVelocity.current.vy * dx) * 0.001;
        }
      }

      // Disperse with scroll
      if (scrollFactor > 0.1) {
        mol.pos.x += (mol.pos.x > 0 ? 1 : -1) * scrollFactor * 0.02;
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
