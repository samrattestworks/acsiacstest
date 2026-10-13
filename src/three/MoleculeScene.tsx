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

function MolecularLattice({ count, isPaused }: { count: number; isPaused: boolean }) {
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

  // Track pointer in 3D world units
  const pointerWorld = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (isPaused) return;

    // Convert normalized pointer to approximate viewport coordinates
    pointerWorld.current.x = (state.pointer.x * viewport.width) / 2;
    pointerWorld.current.y = (state.pointer.y * viewport.height) / 2;

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

      // Pointer interactive attraction
      const attraction = calculatePointerAttraction(
        { x: mol.pos.x, y: mol.pos.y, z: mol.pos.z },
        pointerWorld.current,
        4.5,
        0.02
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
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#00D2FF" />
      <pointLight position={[-10, -5, -5]} intensity={1.2} color="#2563EB" />

      {/* Instanced Central Oxygen Atoms */}
      <instancedMesh ref={oxygenInstancedRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshStandardMaterial
          color="#00D2FF"
          emissive="#0047AB"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.6}
        />
      </instancedMesh>

      {/* Instanced Satellite Hydrogen Atoms */}
      <instancedMesh ref={hydrogenInstancedRef} args={[undefined, undefined, count * 2]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial
          color="#F8FAFC"
          emissive="#38BDF8"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.4}
        />
      </instancedMesh>

      {/* Dynamic Hydrogen Bonds (Dashed / Translucent additive lines) */}
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
          color="#38BDF8"
          transparent
          opacity={0.45}
          dashSize={0.2}
          gapSize={0.15}
          blending={THREE.AdditiveBlending}
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
        <MolecularLattice count={particleCount} isPaused={isPaused} />
      </Canvas>
    </div>
  );
};

export default MoleculeScene;
