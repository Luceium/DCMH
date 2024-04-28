"use client";

import { Tabs } from "./ui/tabs";
import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";

function generateTab(name: string, items: Item[]) {
  return {
    title: name,
    value: name,
    content: (
      <div className="w-full flex flex-col relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-700 to-gray-900 gap-4 overflow-y-scroll">
        <p>{name} Products</p>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    ),
  };
}

export default function MainPageTabs({
  items,
}: {
  items: Record<string, Item[]>;
}) {
  const tabs = Object.entries(items).map(([category, items]) => {
    return generateTab(category, items);
  });

  return (
    <div className="h-[100vh] [perspective:1000px] relative b flex flex-col max-w-[90%] mx-auto w-full items-start justify-start mb-40 overflow-y-visible">
      <Tabs contentClassName="h-[100vh]" tabs={tabs} />
    </div>
  );
}
