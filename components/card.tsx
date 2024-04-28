import { Item } from "@prisma/client";
import Image from "next/image";
import React from "react";

const Card = ({
  name,
  description,
  quantity,
  targetQuantity,
  arrival,
  imageURL
}: Item) => {
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
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Donate!</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
