import React from "react";
import { Progress } from "./progress";

const ItemCardForm = () => {
  return (
    <div className="card w-80 bg-gray-500 mb-4">
      <div className="h-[275px] bg-gray-500 w-full">
        <input
          defaultValue="image url"
          className="overflow-hidden w-full text-lg"
        ></input>
      </div>
      <div className="card-body text-sm">
        <input className="card-title" defaultValue="Name: " />
        <textarea defaultValue="Description: "></textarea>
        <div>
          <Progress value={50} />
          <p>
            {50}/{100}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemCardForm;
