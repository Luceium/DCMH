import React, { useContext, useEffect } from "react";
import Card from "./card";
import { Item } from "@prisma/client";
import { fetchItem } from "@/actions/fetchItems";
import { EditSVG, StarSVG, XSVG } from "./svg";
import { EditContext } from "@/lib/context";
import { deleteItem, toggleItemPriority } from "@/actions/editItems";
import ItemCardForm from "./ui/itemCardForm";
import isAdmin from "@/lib/is-admin";
import CardEditBar from "./CardEditBar";

const ItemCard = ({
  item,
  updateItem,
  deleteItem: deleteItemFromUI,
}: {
  item: Item;
  updateItem: (item: Item) => void;
  deleteItem: (item: Item) => void;
}) => {
  const [editCardMode, setEditCardMode] = React.useState(false);
  const { edit } = useContext(EditContext);
  useEffect(() => {
    setEditCardMode(false);
  }, [edit]);

  return edit && editCardMode ? (
    <ItemCardForm
      partialItem={item}
      updateItem={updateItem}
      setEditCardMode={setEditCardMode}
    />
  ) : (
    <Card
      id={item.id}
      name={item.name}
      targetQuantity={item.targetQuantity}
      quantity={item.quantity}
      description={item.description}
      imageURL={item.imageURL}
      category={item.category}
    >
      {/* {edit && (
        <div className="absolute top-0 right-0 p-2 text-black bg-opacity-35 bg-white rounded-2xl">
          <button
            onClick={async () => {
              await toggleItemPriority(item.id);
            }}
            className="px-1"
          >
            <StarSVG />
          </button>
          <button
            onClick={async () => {
              setEditCardMode(true);
            }}
            className="px-1"
          >
            <EditSVG />
          </button>
          <button
            onClick={async () => {
              await deleteItem(item.id);
              deleteItemFromUI(item);
            }}
            className="px-1"
          >
            <XSVG />
          </button>
        </div>
      )} */}
      {edit && (
        <CardEditBar
          item={item}
          setEditCardMode={setEditCardMode}
          deleteItemFromUI={deleteItemFromUI}
        />
      )}
    </Card>
  );
};

export default ItemCard;
