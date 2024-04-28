import { Item } from "@/lib/types";
import React from "react";

const Card = ({
  name,
  target,
  quantity,
  unverifiedQuantity,
  description,
  trend,
}: Item) => {
  return (
    <div className="card w-96 glass">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt={name}
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
