"use client";
import React, { useContext, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditContext } from "@/lib/context";
import { addCategory } from "@/actions/categories";
import { Category } from "@prisma/client";
import CategoryTab from "./category-tab";
import TabField from "./tab-field";
import { useRouter } from "next/navigation";

const PRIORITY_ITEMS = "PRIORITY_ITEMS";

export function TabsHeader({
  activeCategory,
  setActiveCategory,
  categories,
  setCategories,
}: {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const { edit } = useContext(EditContext);
  const [addingCategory, setAddingCategory] = useState(false);
  const router = useRouter();

  return (
    <>
      <Tabs
        value={activeCategory}
        className="mb-8"
        onValueChange={(value) => {
          router.push(`/?tab=${value}`, undefined);
          setActiveCategory(value);
        }}
      >
        <TabsList className="w-full h-auto flex-wrap justify-start overflow-x-auto gap-2">
          <TabsTrigger
            value={PRIORITY_ITEMS}
            className="px-4 py-2 text-sm border border-gray-400"
          >
            Priority Items
          </TabsTrigger>
          {categories.map((category: Category) => (
            <CategoryTab
              key={category.id}
              category={category}
              setCategories={setCategories}
            />
          ))}
          {edit &&
            (!addingCategory ? (
              <button
                className="border-4 rounded-sm border-gray-400 bg-gray-400 py-1 px-2 text-white transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => setAddingCategory(true)}
                aria-label="Add New Category"
              >
                Add New Category +
              </button>
            ) : (
              <TabField
                defaultValue=""
                onCancel={() => setAddingCategory(false)}
                onSubmit={async (e) => {
                  const newName = e.currentTarget.value;
                  if (
                    !newName.toLowerCase().includes("prior") &&
                    newName.length > 0
                  ) {
                    const newCategory = await addCategory(
                      e.currentTarget.value
                    );
                    if (newCategory)
                      setCategories([...categories, newCategory]);
                  }
                  setAddingCategory(false);
                }}
              />
            ))}
        </TabsList>
      </Tabs>
    </>
  );
}
