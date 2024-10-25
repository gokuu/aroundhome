import { useCallback, useEffect, useState } from "react";
import { Materials } from "../types";

interface MaterialListProps {
  onMaterialsChanged?: (materials: Materials[]) => void;
}

const MAPPING: Record<Materials, string> = {
  wood: "Wood",
  carpet: "Carpet",
  tiles: "Tiles",
} as const;

export default function MaterialList({
  onMaterialsChanged,
}: MaterialListProps) {
  const [materials, setMaterials] = useState<Record<Materials, boolean>>({
    wood: false,
    carpet: false,
    tiles: false,
  });

  const onMaterialToggled = useCallback(
    (material: Materials, selected: boolean) => {
      setMaterials((previous) => ({ ...previous, [material]: selected }));
    },
    []
  );

  useEffect(() => {
    if (!onMaterialsChanged) {
      return;
    }

    onMaterialsChanged?.(
      Object.entries(materials)
        .filter(([, selected]) => selected)
        .map(([material]) => material as Materials)
    );
  }, [materials, onMaterialsChanged]);

  return (
    <div className={`flex flex-col items-stretch gap-px`}>
      {Object.entries(MAPPING).map(([material, label]) => (
        <label
          key={material}
          className="cursor-pointer flex gap-px p-2 rounded hover:bg-blue-500/25 has-[:checked]:bg-blue-500/50"
        >
          <input
            type="checkbox"
            name="customer"
            className="hidden"
            onChange={(event) =>
              onMaterialToggled(material as Materials, event.target.checked)
            }
          />
          {label}
        </label>
      ))}
    </div>
  );
}
