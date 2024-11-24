import type { RoofDetails } from '@/services/types/calculator';

export default function RoofDetails({
    roof,
    index,
    updateRoof,
}: {
    roof: RoofDetails;
    index: number;
    updateRoof: (index: number, updatedRoof: RoofDetails) => void;
}): JSX.Element {
  return (
    <div>
      <h3 className="text-xl mb-2">Roof {index + 1}</h3>
      <label>
        Orientation:
        <input
          type="number"
          value={roof.roofOrientation}
          onChange={(e) =>
            updateRoof(index, { ...roof, roofOrientation: +e.target.value })
          }
          className="border p-2"
        />
      </label>
      <label>
        Slope:
        <input
          type="number"
          value={roof.roofSlope}
          onChange={(e) =>
            updateRoof(index, { ...roof, roofSlope: +e.target.value })
          }
          className="border p-2"
        />
      </label>
      <label>
        Shade Factor:
        <input
          type="number"
          value={roof.shadeFactor}
          onChange={(e) =>
            updateRoof(index, { ...roof, shadeFactor: +e.target.value })
          }
          className="border p-2"
        />
      </label>
    </div>
  );
}
