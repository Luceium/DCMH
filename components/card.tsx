import { Item } from "@prisma/client";
import Image from "next/image";
import React, { ReactNode } from "react";

const Card = ({
  name,
  description,
  quantity,
  targetQuantity,
  arrival,
  imageURL,
  children,
}: (Item & {children: ReactNode})) => {
  return (
    <div className="card w-80 glass mb-4">
      <figure>
        <Image
          src={imageURL}
          alt={name}
          width={275}
          height={275}
        />
      </figure>
      <div className="card-body text-sm">
        <p className="card-title">{name}</p>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
