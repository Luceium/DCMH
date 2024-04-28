import React, { useContext } from "react";
import AdminWrapper from "@/components/adminWrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Card from "./card";
import { Item } from "@prisma/client";
import EditQuantityModal from "./edit-quantity-modal";
import { fetchItem } from "@/actions/fetchItems";
import { XSVG } from "./svg";
import { EditContext } from "@/lib/context";
import { deleteItem } from "@/actions/deleteItem";

const ItemCard = ({
  item,
  updateItem,
}: {
  item: Item;
  updateItem: (item: Item) => void;
}) => {
  const { edit } = useContext(EditContext);

  return (
    <Dialog
      onOpenChange={async (open) => {
        if (open) {
          const newItem = await fetchItem(item.id);
          if (newItem) updateItem(newItem);
        }
      }}
    >
      <Card
        id={item.id}
        name={item.name}
        targetQuantity={item.targetQuantity}
        quantity={item.quantity}
        description={item.description}
        imageURL={item.imageURL}
        category={item.category}
      >
        {edit && (
          <button
            onClick={() => {
              deleteItem(item.id);
            }}
            className="absolute top-0 right-0 p-2 text-black"
          >
            <XSVG />
          </button>
        )}
        <AdminWrapper>
          <div className="card-actions justify-end">
            <DialogTrigger className="btn btn-primary">Update</DialogTrigger>
          </div>
        </AdminWrapper>
      </Card>
      <DialogContent>
        <EditQuantityModal item={item} updateItem={updateItem} />
      </DialogContent>
    </Dialog>
  );
};

export default ItemCard;
