import { describe, it, expect } from 'vitest';
import {
  calculateDistance,
  computeHydrogenBonds,
  calculatePointerAttraction,
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
  });
});
