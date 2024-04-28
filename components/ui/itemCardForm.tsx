import React from "react";
import { Progress } from "./progress";

const ItemCardForm = () => {
  return (
    <div className="card w-80 bg-gray-500 mb-4">
      <div className="h-[275px] bg-gray-500 p-5 rounded-lg text-center">
        <p className="">Add New Item</p>
        <div className="divider my-1 before:bg-black after:bg-black"/>
        <input
          defaultValue="image url"
          className="overflow-hidden w-full text-lg rounded-md p-1 text-primary"
        />
      </div>
      <div className="card-body text-sm">
        <input className="card-title rounded-md p-1 text-primary" defaultValue="Name: " />
        <textarea className="rounded-md p-1 text-primary" defaultValue="Description: "></textarea>
        <div className="hidden">
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
