"use client";
import { Category, Item } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import ItemCardForm from "./ui/itemCardForm";
import EditableCard from "./ItemCard";
import { EditContext } from "@/lib/context";
import * as db from "@/actions/editItems";
import { fetchItems, fetchPriorityItems } from "@/actions/fetchItems";

export const TabsContent = ({
  items,
  categories,
  activeCategory,
}: {
  items: Item[];
  categories: Category[];
  activeCategory: string;
}) => {
  const { edit } = useContext(EditContext);
  const [inventoryItems, setInventoryItems] = useState<Item[]>(items);

  useEffect(() => {
    console.log("fetching items");
    if (activeCategory === "PRIORITY_ITEMS") {
      console.log("fetching priority items");
      fetchPriorityItems().then((priorityItems) => {
        setInventoryItems(priorityItems);
      });
    } else {
      console.log("fetching category items");
      fetchItems(activeCategory).then((categoryItems) => {
        setInventoryItems(categoryItems);
      });
    }
  }, [activeCategory]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {inventoryItems.length == 0 && <h1>No Items</h1>}
      {inventoryItems.map((item: Item) => (
        <EditableCard
          key={item.id}
          starItem={() =>
            starItem(item.id, !item.priority, activeCategory, setInventoryItems)
          }
          onSubmit={(formData) =>
            updateItemFromFrom(formData, setInventoryItems, activeCategory)
          }
          deleteItem={() => deleteItem(item, setInventoryItems)}
          item={item}
          categories={categories}
        />
      ))}
      {activeCategory !== "PRIORITY_ITEMS" && edit && (
        <ItemCardForm
          partialItem={{ categoryId: activeCategory }}
          onSubmit={(formData) => addItemFromForm(formData, setInventoryItems)}
          categories={categories}
        />
      )}
    </div>
  );
};

async function starItem(
  id: string,
  priority: boolean,
  activeCategory: string,
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) {
  // updates db
  const updatedItem = await db.star(id, priority);
  if (!updatedItem) return;

  if (!priority && activeCategory == "PRIORITY_ITEMS") {
    setItems((items) => items.filter((i) => i.id !== updatedItem.id));
  } else {
    setItems((items) =>
      items.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
  }
}

async function updateItemFromFrom(
  item: Omit<Item, "id" | "categoryId" | "priority"> & {
    category: string;
    id?: string;
  },
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  activeCategory: string
) {
  if (!item.id) return;
  // updates db
  const updatedItem = await db.updateItem({ ...item, id: item.id! });
  if (!updatedItem) return;

  // updates local ui state
  if (item.category === activeCategory) {
    setItems((items) =>
      items.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
  } else {
    setItems((items) => items.filter((i) => i.id !== updatedItem.id));
  }
}

async function addItemFromForm(
  item: Omit<Item, "id" | "categoryId" | "priority"> & {
    category: string;
    id?: string;
  },
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) {
  // adds item to db
  const newItem = await db.addItem(item);
  if (!newItem) return;

  // adds item to local ui state
  setItems((items) => [...items, newItem]);
}

async function deleteItem(
  item: Item,
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) {
  await db.deleteItem(item.id);
  setItems((items) => items.filter((i) => i.id !== item.id));
}

export default TabsContent;
