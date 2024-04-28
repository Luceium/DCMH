import React, { useEffect, useState } from "react";
import { DialogClose, DialogHeader } from "./ui/dialog";
import { Item } from "@prisma/client";
import ShimmerButton from "./ui/shimmer-button";
import prisma from "@/lib/prisma";
import { updateQuantities } from "@/actions/updateQuantities";

const EditQuantityModal = ({
  item,
  updateItem,
}: {
  item: Item;
  updateItem: (item: Item) => void;
}) => {
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const [newTargetQuantity, setNewTargetQuantity] = useState(
    item.targetQuantity
  );

  useEffect(() => {
    setNewQuantity(item.quantity);
    setNewTargetQuantity(item.targetQuantity);
  }, [item]);

  return (
    <>
      <DialogHeader>Edit {item.name} Quantity</DialogHeader>
      <div className="flex gap-4 flex-col">
        <div className="flex flex-row items-center justify-center gap-4">
          <span>Current Quantity:</span>
          <input
            onChange={(e) => {
              e.preventDefault();
              setNewQuantity(parseInt(e.target.value));
            }}
            type="number"
            name="quantity"
            value={newQuantity}
            className="input max-w-20"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <span>Target Quantity:</span>
          <input
            onChange={(e) => {
              e.preventDefault();
              setNewTargetQuantity(parseInt(e.target.value));
            }}
            type="number"
            name="targetQuantity"
            value={newTargetQuantity}
            className="input max-w-20"
          />
        </div>
      </div>
      <DialogClose>
        <ShimmerButton
          handleOnClick={async () =>
            updateItem(
              await updateQuantities(item.id, newQuantity, newTargetQuantity)
            )
          }
        >
          Save
        </ShimmerButton>
      </DialogClose>
    </>
  );
};

export default EditQuantityModal;
