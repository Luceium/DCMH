import React from "react";
import { DialogClose, DialogHeader } from "./ui/dialog";
import { Item } from "@prisma/client";
import ShimmerButton from "./ui/shimmer-button";

const EditQuantityModal = ({ item }: { item: Item }) => {
  return (
    <>
      <DialogHeader>Edit {item.name} Quantity</DialogHeader>
      <div className="flex gap-4 flex-col">
        <div className="flex flex-row items-center justify-center gap-4">
          <span>Current Quantity:</span>
          <input
            type="number"
            name="quantity"
            defaultValue={item.quantity}
            className="input max-w-20"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <span>Target Quantity:</span>
          <input
            type="number"
            name="targetQuantity"
            defaultValue={item.targetQuantity}
            className="input max-w-20"
          />
        </div>
      </div>
      <DialogClose>
        <ShimmerButton>Save</ShimmerButton>
      </DialogClose>
    </>
  );
};

export default EditQuantityModal;
