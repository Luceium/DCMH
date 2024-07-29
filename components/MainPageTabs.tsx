"use client";

import { Tabs } from "./ui/tabs";
import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";
import { useContext, useEffect, useState } from "react";
import { produce } from "immer";
import { fetchItems } from "@/actions/fetchItems";
import { EditContext } from "@/lib/context";
import ItemCardForm from "./ui/itemCardForm";

export default function MainPageTabs({ items: _items }: { items: Item[] }) {
  const { edit } = useContext(EditContext);
  const [items, setItems] = useState(_items);

  function generateTab(name: string, categoryItems: Item[]) {
    function updateItem(item: Item) {
      setItems(
        produce(items, (draft) => {
          draft[draft.findIndex((draftItem) => draftItem.id === item.id)] =
            item;
        })
      );

      console.log(items);
    }
    function addItem(item: Item) {
      setItems(
        produce(items, (draft) => {
          draft.push(item);
        })
      );
    }
    function deleteItem(item: Item) {
      setItems(
        produce(items, (draft) => {
          draft.splice(
            draft.findIndex((draftItem) => draftItem.id === item.id),
            1
          );
        })
      );
    }

    return {
      title: name,
      value: name,
      content: (
        <div className="w-full flex flex-col relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold bg-gradient-to-br from-gray-700 to-gray-900 gap-4 overflow-y-scroll">
          <p>{name} Products</p>
          <div className="flex justify-center flex-wrap gap-5">
            {categoryItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            ))}
            {edit && (
              <ItemCardForm
                partialItem={{ category: name }}
                addItem={addItem}
              />
            )}
          </div>
        </div>
      ),
    };
  }

  const tabs = [];

  const prioritizedItems = items.filter((item) => item.priority);
  if (prioritizedItems.length > 0)
    tabs.push(generateTab("Prioritized", prioritizedItems));

  // get all categories
  const categories = items
    .map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index);
  categories.forEach((category) => {
    const categoryItems = items.filter((item) => item.category === category);
    tabs.push(generateTab(category, categoryItems));
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      setItems(await fetchItems());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100vh] [perspective:1000px] relative b flex flex-col max-w-[90%] mx-auto w-full items-start justify-start mb-40 overflow-y-visible">
      <Tabs contentClassName="h-[100vh]" tabs={tabs} />
    </div>
  );
}
