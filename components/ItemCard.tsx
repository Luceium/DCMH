import React, { useContext, useEffect } from "react";
import ItemCard from "./card";
import { Item } from "@prisma/client";
import { EditContext } from "@/lib/context";
import ItemCardForm from "./ui/itemCardForm";
import CardEditBar from "./CardEditBar";

const EditableCard = ({
  item,
  updateItem,
  deleteItem: deleteItemFromUI,
  invalidateSignal,
}: {
  item: Item;
  updateItem: (item: Item) => void;
  deleteItem: (item: Item) => void;
  invalidateSignal: boolean;
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
      invalidateSignal={invalidateSignal}
    />
  ) : (
    <ItemCard item={item}>
      {edit && (
        <CardEditBar
          item={item}
          setEditCardMode={setEditCardMode}
          deleteItemFromUI={deleteItemFromUI}
          updateItemFromUI={updateItem}
        />
      )}
    </ItemCard>
  );
};

export default EditableCard;
