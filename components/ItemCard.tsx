import React from "react";
import AdminWrapper from "@/components/adminWrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Card from "./card";
import { Item } from "@prisma/client";

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Dialog>
      <Card
        id={item.id}
        name={item.name}
        targetQuantity={item.targetQuantity}
        quantity={item.quantity}
        description={item.description}
        imageURL={item.imageURL}
        category={item.category}
        arrival={item.arrival}
      >
        <AdminWrapper>
          <DialogTrigger>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Update</button>
            </div>
          </DialogTrigger>
        </AdminWrapper>
      </Card>
      <DialogContent>
        <DialogHeader>Edit {item.name} Quantity</DialogHeader>
        <div className="flex flex-col gap-4">
          <label>
            <span>Current Quantity:</span>
            <input
              type="number"
              name="quantity"
              defaultValue={item.quantity}
              className="input"
            />
          </label>
          <label>
            <span>Target Quantity:</span>
            <input
              type="number"
              name="targetQuantity"
              defaultValue={item.targetQuantity}
              className="input"
            />
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemCard;
