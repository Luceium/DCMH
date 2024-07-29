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
    <Card item={item}>
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
