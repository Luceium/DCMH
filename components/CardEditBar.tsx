import React from "react";
import { EditSVG, StarSVG, XSVG } from "./svg";
import { Item } from "@prisma/client";
import { deleteItem, toggleItemPriority } from "@/actions/editItems";

const CardEditBar = ({
  item,
  setEditCardMode,
  deleteItemFromUI,
  updateItemFromUI,
}: {
  item: Item;
  setEditCardMode: React.Dispatch<React.SetStateAction<boolean>>;
  deleteItemFromUI: (item: Item) => void;
  updateItemFromUI: (item: Item) => void;
}) => {
  return (
    <div className="absolute top-0 right-0 p-2 text-black bg-opacity-35 bg-white rounded-2xl">
      <button
        onClick={async () => {
          updateItemFromUI(await toggleItemPriority(item.id));
        }}
        className="px-1"
      >
        <StarSVG fill={item.priority} />
      </button>
      <button
        onClick={async () => {
          setEditCardMode(true);
        }}
        className="px-1"
      >
        <EditSVG />
      </button>
      <button
        onClick={async () => {
          await deleteItem(item.id);
          deleteItemFromUI(item);
        }}
        className="px-1"
      >
        <XSVG />
      </button>
    </div>
  );
};

export default CardEditBar;
