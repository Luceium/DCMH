import React, { useContext, useEffect } from "react";
import Card from "./card";
import { Item } from "@prisma/client";
import { EditContext } from "@/lib/context";
import ItemCardForm from "./ui/itemCardForm";
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
          updateItemFromUI={updateItem}
        />
      )}
    </Card>
  );
};

export default ItemCard;
