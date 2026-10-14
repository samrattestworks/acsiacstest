export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface BondPair {
  sourceIndex: number;
  targetIndex: number;
  distance: number;
  strength: number; // 0 to 1, based on proximity
}

export interface MoleculeParticle {
  position: Vector3D;
  velocity: Vector3D;
  orientation: Vector3D;
  basePosition: Vector3D;
}

/**
 * Pure Euclidean distance between two 3D coordinates.
 */
export function calculateDistance(a: Vector3D, b: Vector3D): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Pure function computing active hydrogen bonds between drifting molecules.
 * Simulates dynamic H-bonding thresholding in molecular dynamics.
 */
export function computeHydrogenBonds(
  positions: Vector3D[],
  minDistance: number,
  maxDistance: number,
  maxBondsPerAtom: number = 3
): BondPair[] {
  const bonds: BondPair[] = [];
  const bondCounts = new Array(positions.length).fill(0);

  for (let i = 0; i < positions.length; i++) {
    const posA = positions[i];
    if (!posA) continue;

    for (let j = i + 1; j < positions.length; j++) {
      if ((bondCounts[i] ?? 0) >= maxBondsPerAtom || (bondCounts[j] ?? 0) >= maxBondsPerAtom) {
        continue;
      }

      const posB = positions[j];
      if (!posB) continue;

      const dist = calculateDistance(posA, posB);
      if (dist >= minDistance && dist <= maxDistance) {
        // Clamped normalized strength (1 at minDistance, 0 at maxDistance)
        const strength = Math.max(
          0,
          Math.min(1, 1 - (dist - minDistance) / (maxDistance - minDistance))
        );
        bonds.push({
          sourceIndex: i,
          targetIndex: j,
          distance: dist,
          strength,
        });

        bondCounts[i] = (bondCounts[i] ?? 0) + 1;
        bondCounts[j] = (bondCounts[j] ?? 0) + 1;
      }
    }
  }

  return bonds;
}

/**
 * Calculates cursor/touch perturbation in 3D space with anti-coagulation core repulsion.
 * When a molecule is closer than minCoreRadius, it experiences Pauli-like exclusion
 * repelling it away from the probe so molecules can NEVER collapse or coagulate into a clump.
 * In the intermediate zone (minCoreRadius to influenceRadius), it stabilizes into an ordered
 * dynamic solvation shell.
 */
export function calculatePointerAttraction(
  pos: Vector3D,
  pointerPos: { x: number; y: number },
  influenceRadius: number = 5,
  intensity: number = 0.8,
  minCoreRadius: number = 1.0
): Vector3D {
  const dx = pointerPos.x - pos.x;
  const dy = pointerPos.y - pos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 0.0001 || dist > influenceRadius) {
    return { x: 0, y: 0, z: 0 };
  }

  // Inside the physical probe core: strong steric repulsion pushing OUTWARD
  if (dist < minCoreRadius) {
    const repulseFactor = ((minCoreRadius - dist) / minCoreRadius) * intensity * 1.5;
    return {
      x: -(dx / dist) * repulseFactor,
      y: -(dy / dist) * repulseFactor,
      z: 0,
    };
  }

  // Between minCoreRadius and influenceRadius: gentle solvation ring equilibrium
  const factor = (1 - dist / influenceRadius) * intensity;
  return {
    x: (dx / dist) * factor,
    y: (dy / dist) * factor,
    z: 0,
  };
}

/**
 * Calculates intermolecular pairwise steric (hard-core) repulsion between two molecules.
 * Implements van der Waals / Pauli exclusion to physically prohibit molecular clumping.
 */
export function calculateStericRepulsion(
  posA: Vector3D,
  posB: Vector3D,
  minDistance: number = 1.6,
  strength: number = 0.05
): Vector3D {
  const dx = posA.x - posB.x;
  const dy = posA.y - posB.y;
  const dz = posA.z - posB.z;
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

  if (dist < 0.0001 || dist >= minDistance) {
    return { x: 0, y: 0, z: 0 };
  }

  // Linear repulsion factor pushing apart
  const factor = ((minDistance - dist) / minDistance) * strength;
  return {
    x: (dx / dist) * factor,
    y: (dy / dist) * factor,
    z: (dz / dist) * factor,
  };
}

/**
 * Calculates hydrodynamic vortex swirl around a touch/drag disturbance point.
 * Simulates fluidic circulation and shear streamlines like stirring a solution with a glass rod.
 */
export function calculateVortexForce(
  pos: Vector3D,
  pointerPos: { x: number; y: number },
  influenceRadius: number = 5,
  swirlIntensity: number = 0.03
): Vector3D {
  const dx = pos.x - pointerPos.x;
  const dy = pos.y - pointerPos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 0.0001 || dist > influenceRadius) {
    return { x: 0, y: 0, z: 0 };
  }

  // Tangential velocity vector: (-dy, dx)
  const factor = (1 - dist / influenceRadius) * swirlIntensity;
  return {
    x: (-dy / dist) * factor,
    y: (dx / dist) * factor,
    z: 0,
  };
}

/**
 * Generates initial water-like triatomic molecule offsets (1 Central Oxygen + 2 Hydrogen atoms)
 */
export function getWaterGeometryOffsets(
  bondLength: number = 0.957,
  bondAngleDegrees: number = 104.5
): {
  oxygen: Vector3D;
  hydrogen1: Vector3D;
  hydrogen2: Vector3D;
} {
  const halfAngleRad = (bondAngleDegrees / 2) * (Math.PI / 180);
  const sinA = Math.sin(halfAngleRad);
  const cosA = Math.cos(halfAngleRad);

  return {
    oxygen: { x: 0, y: 0, z: 0 },
    hydrogen1: { x: -bondLength * sinA, y: -bondLength * cosA, z: 0 },
    hydrogen2: { x: bondLength * sinA, y: -bondLength * cosA, z: 0 },
  };
}
