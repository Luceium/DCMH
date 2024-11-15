import React, { ReactNode } from "react";
import { Progress } from "./ui/progress";
import Image from "next/image";
import { Item } from "@prisma/client";
import { Card, CardContent } from "./ui/card";

const ItemCard = ({ item, children }: { item: Item; children: ReactNode }) => {
  return (
    <Card key={item.id} className="overflow-hidden relative">
      <div className="aspect-square relative">
        <Image
          src={item.imageURL}
          alt={item.name}
          className="object-cover w-full h-full"
          width={400}
          height={400}
        />
        {children}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="space-y-2">
          <Progress value={(item.quantity / item.targetQuantity) * 100} />
          <p className="text-sm text-gray-600">
            Donation Goal: {item.quantity}/{item.targetQuantity}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
