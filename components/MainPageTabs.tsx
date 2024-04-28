"use client";

import { Tabs } from "./ui/tabs";
import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { fetchItems } from "@/actions/fetchItems";

function generateTab(
  name: string,
  items: Item[],
  updateItem: (item: Item) => void
) {
  return {
    title: name,
    value: name,
    content: (
      <div className="w-full flex flex-col relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-700 to-gray-900 gap-4 overflow-y-scroll">
        <p>{name} Products</p>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} updateItem={updateItem} />
          ))}
        </div>
      </div>
    ),
  };
}

export default function MainPageTabs({
  items: _items,
}: {
  items: Record<string, Item[]>;
}) {
  const [items, setItems] = useState(_items);
  const tabs = Object.entries(items).map(([category, i]) => {
    return generateTab(category, i, (item: Item) => {
      setItems(
        produce(items, (draft) => {
          draft[category][
            draft[category].findIndex((draftItem) => draftItem.id === item.id)
          ] = item;
        })
      );
    });
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
