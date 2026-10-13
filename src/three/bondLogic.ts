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
 * Calculates cursor attraction / deflection vector in 3D space.
 */
export function calculatePointerAttraction(
  pos: Vector3D,
  pointerPos: { x: number; y: number },
  influenceRadius: number = 5,
  intensity: number = 0.8
): Vector3D {
  const dx = pointerPos.x - pos.x;
  const dy = pointerPos.y - pos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 0.0001 || dist > influenceRadius) {
    return { x: 0, y: 0, z: 0 };
  }

  const factor = (1 - dist / influenceRadius) * intensity;
  return {
    x: (dx / dist) * factor,
    y: (dy / dist) * factor,
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
