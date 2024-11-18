import React, { useContext, useEffect } from "react";
import ItemCard from "./card";
import { Category, Item } from "@prisma/client";
import { EditContext } from "@/lib/context";
import ItemCardForm, { FormSchema } from "./ui/itemCardForm";
import CardEditBar from "./CardEditBar";

const EditableCard = ({
  item,
  onSubmit,
  deleteItem,
  categories,
  starItem,
}: {
  item: Item;
  onSubmit: (formData: FormSchema & { id?: string }) => void;
  deleteItem: (item: Item) => void;
  categories: Category[];
  starItem: () => void;
}) => {
  const [editCardMode, setEditCardMode] = React.useState(false);
  const { edit } = useContext(EditContext);
  useEffect(() => {
    setEditCardMode(false);
  }, [edit]);

  return edit && editCardMode ? (
    <ItemCardForm
      partialItem={item}
      onSubmit={onSubmit}
      setEditCardMode={setEditCardMode}
      categories={categories}
    />
  ) : (
    <ItemCard item={item}>
      {edit && (
        <CardEditBar
          setEditCardMode={setEditCardMode}
          deleteItem={() => deleteItem(item)}
          starItem={starItem}
          prioritized={item.priority}
        />
      )}
    </ItemCard>
  );
};

export default EditableCard;
