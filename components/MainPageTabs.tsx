"use client";

import { Tabs } from "./ui/tabs";
import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";
import { useContext, useEffect, useState } from "react";
import { produce } from "immer";
import { fetchItems } from "@/actions/fetchItems";
import { EditContext } from "@/lib/context";
import ItemCardForm from "./ui/itemCardForm";

type Tab = {
  title: string;
  value: string;
  content: JSX.Element;
};

export default function MainPageTabs({ items: _items }: { items: Item[] }) {
  const [items, setItems] = useState(_items);

  function generateTab(name: string, categoryItems: Item[]): Tab {
    function updateItem(item: Item) {
      setItems(
        produce(items, (draft) => {
          draft[draft.findIndex((draftItem) => draftItem.id === item.id)] =
            item;
        })
      );
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
            <ItemCardForm partialItem={{ category: name }} addItem={addItem} />
          </div>
        </div>
      ),
    };
  }

  function generateAllTabs(existingTabs: Tab[]) {
    return produce(existingTabs, (draft) => {
      const prioritizedItems = items.filter((item) => item.priority);
      if (draft[0]?.value !== "Prioritized") {
        if (prioritizedItems.length > 0)
          draft.splice(0, 0, generateTab("Prioritized", prioritizedItems));
      } else {
        draft[0] = generateTab("Prioritized", prioritizedItems);
      }

      const categories = new Set(items.map((item) => item.category));
      categories.forEach((category) => {
        const existingTabIndex = draft.findIndex(
          (tab) => tab.value === category
        );
        const categoryItems = items.filter(
          (item) => item.category === category
        );
        if (existingTabIndex === -1) {
          draft.push(generateTab(category, categoryItems));
        } else {
          draft[existingTabIndex] = generateTab(category, categoryItems);
        }
      });
    });
  }

  const [tabs, setTabs] = useState(generateAllTabs([]));
  useEffect(() => {
    setTabs((oldTabs) => generateAllTabs(oldTabs));
  }, [items]);

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
