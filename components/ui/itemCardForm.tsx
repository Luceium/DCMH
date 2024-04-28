import React from "react";
import { Progress } from "./progress";
import { addItem, addItemFromForm } from "@/actions/editItems";
import { Item } from "@prisma/client";

const ItemCardForm = ({
  category,
  addItem,
}: {
  category: string;
  addItem: (item: Item) => void;
}) => {
  return (
    <div className="card w-80 bg-gray-500 mb-4">
      <form
        className="p-5"
        action={async (formData) => {
          addItem(await addItemFromForm(formData, category));
        }}
      >
        <p className="w-full text-center">Add New Item</p>
        <div className="divider my-1 before:bg-black after:bg-black" />
        <div className="h-[200px] bg-gray-500 w-full">
          <input
            name="imageURL"
            placeholder="image url"
            className="w-full overflow-hidden text-lg rounded-md p-1"
          ></input>
        </div>
        <div className="card-body text-sm p-0">
          <input
            name="name"
            className="card-title p-1 rounded-md"
            placeholder="Name: "
          />
          <textarea
            name="description"
            placeholder="Description: "
            className="overflow-hidden text-lg input p-1 border rounded-md"
          />
          <div>
            <Progress value={50} />
            <p className="pt-2">
              <input
                name="quantity"
                type="number"
                defaultValue={50}
                className="w-12 text-lg input p-1 border rounded-md text-center"
              />
              &nbsp; / &nbsp;
              <input
                name="targetQuantity"
                type="number"
                defaultValue={100}
                className="w-12 text-lg input p-1 border rounded-md text-center"
              />
            </p>
          </div>
          <div className="card-actions justify-end ">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemCardForm;
