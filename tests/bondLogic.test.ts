import { describe, it, expect } from 'vitest';
import {
  calculateDistance,
  computeHydrogenBonds,
  calculatePointerAttraction,
  calculateStericRepulsion,
  calculateVortexForce,
  getWaterGeometryOffsets,
} from '@/three/bondLogic';

describe('bondLogic unit tests', () => {
  it('correctly calculates 3D Euclidean distance', () => {
    const a = { x: 0, y: 0, z: 0 };
    const b = { x: 3, y: 4, z: 0 };
    expect(calculateDistance(a, b)).toBe(5);

    const c = { x: 1, y: 2, z: 2 };
    const d = { x: 1, y: 2, z: 2 };
    expect(calculateDistance(c, d)).toBe(0);
  });

  it('generates water geometry offsets with correct geometry', () => {
    const offsets = getWaterGeometryOffsets(0.957, 104.5);
    expect(offsets.oxygen).toEqual({ x: 0, y: 0, z: 0 });

    const distH1 = calculateDistance(offsets.oxygen, offsets.hydrogen1);
    const distH2 = calculateDistance(offsets.oxygen, offsets.hydrogen2);

    expect(distH1).toBeCloseTo(0.957, 3);
    expect(distH2).toBeCloseTo(0.957, 3);
  });

  it('computes hydrogen bonds within distance thresholds', () => {
    const positions = [
      { x: 0, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 }, // Distance 2.0 (in range [1.5, 3.0])
      { x: 10, y: 0, z: 0 }, // Out of range
    ];

    const bonds = computeHydrogenBonds(positions, 1.5, 3.0, 3);
    expect(bonds.length).toBe(1);
    expect(bonds[0]?.sourceIndex).toBe(0);
    expect(bonds[0]?.targetIndex).toBe(1);
    expect(bonds[0]?.distance).toBe(2);
    expect(bonds[0]?.strength).toBeGreaterThan(0);
  });

  it('calculates pointer attraction within influence radius', () => {
    const pos = { x: 0, y: 0, z: 0 };
    const pointer = { x: 2, y: 0 };

    const force = calculatePointerAttraction(pos, pointer, 5, 1.0);
    expect(force.x).toBeGreaterThan(0);
    expect(force.y).toBe(0);

    const outsideForce = calculatePointerAttraction(pos, { x: 10, y: 10 }, 5, 1.0);
    expect(outsideForce).toEqual({ x: 0, y: 0, z: 0 });

    // Inside core radius (e.g. dist = 0.5 < minCoreRadius = 1.0): pushes AWAY (anti-coagulation)
    const corePos = { x: 1.5, y: 0, z: 0 };
    const closePointer = { x: 2.0, y: 0 }; // dist = 0.5
    const repulseForce = calculatePointerAttraction(corePos, closePointer, 5, 1.0, 1.0);
    expect(repulseForce.x).toBeLessThan(0); // Pushes away from pointer
  });

  it('calculates intermolecular steric repulsion preventing molecular coagulation', () => {
    const a = { x: 1.0, y: 0, z: 0 };
    const b = { x: 1.5, y: 0, z: 0 }; // distance = 0.5 < minDistance = 1.6
    const repulsion = calculateStericRepulsion(a, b, 1.6, 0.1);
    expect(repulsion.x).toBeLessThan(0); // A pushed left away from B

    // Distant molecules experience 0 steric repulsion
    const distant = calculateStericRepulsion(a, { x: 10, y: 0, z: 0 }, 1.6, 0.1);
    expect(distant).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('calculates hydrodynamic vortex swirl circulation', () => {
    const pos = { x: 2, y: 0, z: 0 };
    const center = { x: 0, y: 0 };
    const vortex = calculateVortexForce(pos, center, 5, 0.05);
    // At (2, 0) relative to (0, 0), dx = 2, dy = 0. Tangential velocity (-dy, dx) has positive y!
    expect(vortex.y).toBeGreaterThan(0);
  });
});
