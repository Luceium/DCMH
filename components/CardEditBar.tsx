import React from "react";
import { EditSVG, StarSVG, XSVG } from "./svg";

const CardEditBar = ({
  setEditCardMode,
  deleteItem,
  starItem,
  prioritized,
}: {
  setEditCardMode: React.Dispatch<React.SetStateAction<boolean>>;
  deleteItem: () => void;
  starItem: () => void;
  prioritized: boolean;
}) => {
  return (
    <div className="absolute top-0 right-0 p-2 text-black bg-opacity-35 bg-white rounded-2xl">
      <button
        onClick={async () => {
          starItem();
        }}
        className="px-1"
      >
        <StarSVG fill={prioritized} />
      </button>
      <button
        onClick={async () => {
          setEditCardMode(true);
        }}
        className="px-1"
      >
        <EditSVG />
      </button>
      <button onClick={deleteItem} className="px-1">
        <XSVG />
      </button>
    </div>
  );
};

export default CardEditBar;
