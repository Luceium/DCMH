"use client";
import { useContext, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditContext } from "@/lib/context";
import { X } from "lucide-react";
import {
  addCategory,
  deleteCategory,
  getCategories,
  renameCategory,
} from "@/actions/categories";
import { fetchItems, fetchPriorityItems } from "@/actions/fetchItems";
import Image from "next/image";
import { Category, Item } from "@prisma/client";
import ItemCardForm from "./ui/itemCardForm";
import EditableCard from "./ItemCard";
import CategoryTab from "./category-tab";

const PRIORITY_ITEMS = "PRIORITY_ITEMS";

export default function TabsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(PRIORITY_ITEMS);
  const { edit } = useContext(EditContext);
  const [addingCategory, setAddingCategory] = useState(false);
  const [invalidateSignal, setInvalidateSignal] = useState(false);

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, [invalidateSignal]);

  return (
    <>
      <Tabs
        defaultValue={PRIORITY_ITEMS}
        className="mb-8"
        onValueChange={setActiveCategory}
      >
        <TabsList className="w-full h-12 justify-start overflow-x-auto px-2">
          <TabsTrigger value={PRIORITY_ITEMS} className="px-4 py-2 text-sm">
            Priority Items
          </TabsTrigger>
          {categories.map((category: Category) => (
            <CategoryTab
              key={category.id}
              category={category}
              invalidateSignal={invalidateSignal}
              setInvalidateSignal={setInvalidateSignal}
            />
          ))}
          {edit &&
            (addingCategory ? (
              <div className="flex gap-4 items-center bg-background">
                <input
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setAddingCategory(false);
                    }
                    if (e.key === "Enter") {
                      const newName = e.currentTarget.value;
                      if (
                        !newName.toLowerCase().includes("prior") &&
                        newName.length > 0
                      ) {
                        addCategory(e.currentTarget.value);
                        setInvalidateSignal(!invalidateSignal);
                      }
                      setAddingCategory(false);
                    }
                  }}
                />
                <button onClick={() => setAddingCategory(false)}>
                  <X />
                </button>
              </div>
            ) : (
              <button onClick={() => setAddingCategory(true)}>
                Add Category
              </button>
            ))}
        </TabsList>
      </Tabs>

      <TabsPageContent activeCategory={activeCategory} />
    </>
  );
}

export const TabsPageContent = ({
  activeCategory,
}: {
  activeCategory: string;
}) => {
  const { edit } = useContext(EditContext);
  const [invalidateSignal, setInvalidateSignal] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<Item[]>([]);
  useEffect(() => {
    if (activeCategory == PRIORITY_ITEMS) {
      fetchPriorityItems().then((items) => setInventoryItems(items));
    } else {
      fetchItems(activeCategory).then((items) => setInventoryItems(items));
    }
  }, [activeCategory, invalidateSignal]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* {inventoryItems.length == 0 && <h1>No Items</h1>}
      {inventoryItems.map((item: Item) => (
        <EditableCard
          key={item.id}
          updateItem={updateItem}
          deleteItem={deleteItem}
          item={item}
        />
      ))}
      {activeCategory !== PRIORITY_ITEMS && edit && (
        <ItemCardForm partialItem={{}} addItem={} />
      )} */}
    </div>
  );
};
