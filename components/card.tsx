import { Item } from "@prisma/client";
import Image from "next/image";
import React, { ReactNode } from "react";
import { Progress } from "./ui/progress";

const Card = ({
  name,
  description,
  quantity,
  targetQuantity,
  imageURL,
  children,
}: Item & { children: ReactNode }) => {
  return (
    <div className="card w-80 glass mb-4">
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
          <Progress value={quantity/targetQuantity * 100}/>
          <p>{quantity}/{targetQuantity}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
