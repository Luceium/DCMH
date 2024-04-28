import { Item } from "@prisma/client";
import Image from "next/image";
import React, { ReactNode } from "react";

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
      <div className="card-body text-sm h-32 p-3">
        <p className="card-title py-1">{name}</p>
        <div className="flex justify-between gap-3">
          <p className="text-xs">{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Donate!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
