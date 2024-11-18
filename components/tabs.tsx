"use client";
import { Suspense, useEffect, useState } from "react";
import TabsContent from "./tabs-content";
import { TabsHeader } from "./tabs-header";
import { Category, Item } from "@prisma/client";
import { fetchItems } from "@/actions/fetchItems";

const Tabs = ({
  activeCategory: _activeCategory,
  categories: _categories,
}: {
  activeCategory: string;
  categories: Category[];
}) => {
  const [activeCategory, setActiveCategory] = useState(_activeCategory);
  const [categories, setCategories] = useState(_categories);

  return (
    <>
      <Suspense fallback={<p>Loading Tabs</p>}>
        <TabsHeader
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          setCategories={setCategories}
        />
      </Suspense>
      <Suspense fallback={<p>Loading Content</p>}>
        <TabsContent
          activeCategory={activeCategory}
          categories={categories}
        />
      </Suspense>
    </>
  );
};

export default Tabs;
