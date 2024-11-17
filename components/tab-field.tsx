import { X } from "lucide-react";
import React from "react";

const TabField = ({
  defaultValue,
  onCancel,
  onSubmit,
}: {
  defaultValue: string;
  onCancel: () => void;
  onSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex gap-4 items-center bg-background rounded-sm">
      <input
        defaultValue={defaultValue}
        autoFocus
        className="p-2 rounded-sm"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onCancel();
          }
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
      />
      <button onClick={onCancel}>
        <X />
      </button>
    </div>
  );
};

export default TabField;
