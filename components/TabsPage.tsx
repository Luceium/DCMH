"use client";
import { act, useContext, useEffect, useState } from "react";
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
import { produce } from "immer";

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
        <TabsList className="w-full h-auto flex-wrap justify-start overflow-x-auto gap-2">
          <TabsTrigger value={PRIORITY_ITEMS} className="px-4 py-2 text-sm border border-gray-400">
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
              <div className="flex gap-4 items-center bg-background rounded-sm">
                <input
                  autoFocus
                  className="p-2 rounded-sm"
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
              <button
                className="border-4 rounded-sm border-gray-400 bg-gray-400 py-1 px-2 text-white transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => setAddingCategory(true)}
                aria-label="Add New Category"
              >
                Add New Category +
              </button>
            ))}
        </TabsList>
      </Tabs>

      <TabsPageContent
        activeCategory={activeCategory}
        categories={categories}
        setActiveCategory={setActiveCategory}
        invalidateSignal={invalidateSignal}
      />
    </>
  );
}

export const TabsPageContent = ({
  activeCategory,
  categories,
  setActiveCategory,
  invalidateSignal,
}: {
  activeCategory: string;
  categories: Category[];
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  invalidateSignal: boolean;
}) => {
  const { edit } = useContext(EditContext);

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
      {inventoryItems.length == 0 && <h1>No Items</h1>}
      {inventoryItems.map((item: Item) => (
        <EditableCard
          key={item.id}
          updateItem={() =>
            updateItem(
              item,
              inventoryItems,
              setInventoryItems,
              categories,
              setActiveCategory
            )
          }
          deleteItem={() => deleteItem(item, inventoryItems, setInventoryItems)}
          item={item}
        />
      ))}
      {activeCategory !== PRIORITY_ITEMS && edit && (
        <ItemCardForm
          partialItem={{categoryId: activeCategory}}
          addItem={(newItem) =>
            addItem(
              newItem,
              inventoryItems,
              setInventoryItems,
              categories,
              setActiveCategory
            )
          }
          invalidateSignal={invalidateSignal}
        />
      )}
    </div>
  );
};

function updateItem(
  item: Item,
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  categories: Category[],
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>
) {
  const itemIndex = items.findIndex((i) => i.id === item.id);
  setItems(
    produce(items, (draft) => {
      draft[itemIndex] = item;
    })
  );
  if (items[itemIndex].categoryId !== item.categoryId) {
    const category = categoryIdToName(item.categoryId, categories);
    setActiveCategory(category);
  }
}
function addItem(
  item: Item,
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  categories: Category[],
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>
) {
  setItems(
    produce(items, (draft) => {
      draft.push(item);
    })
  );
  const category = categoryIdToName(item.categoryId, categories);
  setActiveCategory(category);
}
function deleteItem(
  item: Item,
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
) {
  setItems(
    produce(items, (draft) => {
      draft.splice(
        draft.findIndex((draftItem) => draftItem.id === item.id),
        1
      );
    })
  );
}

function categoryIdToName(categoryId: string, categories: Category[]) {
  const category = categories.find((category) => category.id === categoryId);
  return category?.name ?? "";
}