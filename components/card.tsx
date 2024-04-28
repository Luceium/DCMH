import { Item } from "@/lib/types";
import Image from "next/image";
import React from "react";

const Card = ({
  name,
  target,
  quantity,
  unverifiedQuantity,
  description,
  trend,
  imageURL,
}: Item) => {
  return (
    <div className="card w-96 glass">
      <figure>
        <Image
          src={imageURL}
          alt={name}
          width={384}
          height={384}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Donate!</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
