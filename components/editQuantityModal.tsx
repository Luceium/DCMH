import React from "react";
import AdminWrapper from "@/components/adminWrapper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Card from "./card";
import { Item } from "@prisma/client";

const EditQuantityModal = ({item}: {item: Item}) => {
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
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default EditQuantityModal;
