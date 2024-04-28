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
import { Edit } from "lucide-react";
import EditQuantityModal from "./edit-quantity-modal";

const ItemCard = ({
  item,
  updateItem,
}: {
  item: Item;
  updateItem: (item: Item) => void;
}) => {
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
        <EditQuantityModal item={item} updateItem={updateItem} />
      </DialogContent>
    </Dialog>
  );
};

export default ItemCard;
