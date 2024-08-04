import React, { ReactNode } from "react";
import { Progress } from "./ui/progress";
import Image from "next/image";
import { Item } from "@prisma/client";

const Card = ({ item, children }: { item: Item; children: ReactNode }) => {
  const { name, description, quantity, targetQuantity, imageURL } = item;

  return (
    <div className="card w-80 bg-[#e3e8fc] dark:bg-gray-500 mb-4">
      <figure>
        <Image
          className="w-full h-52 object-cover"
          src={imageURL}
          alt={name}
          width={275}
          height={275}
        />
      </figure>
      <div className="card-body text-sm">
        <p className="card-title">{name}</p>
        <p>{description}</p>
        <div>
          <Progress value={(quantity / targetQuantity) * 100} />
          <p>
            {quantity}/{targetQuantity}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
