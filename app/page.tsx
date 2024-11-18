import { Suspense } from "react";
import EditableDescription from "@/components/description";
import { fetchItems, fetchPriorityItems } from "@/actions/fetchItems";
import { getCategories, getCategoryName } from "@/actions/categories";
import { getDescription } from "@/actions/description";
import Tabs from "@/components/tabs";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    tab?: string;
  };
}) {
  const activeCategory = searchParams.tab || "PRIORITY_ITEMS";
  const categories = await getCategories();

  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<p>Loading description</p>}>
        <EditableDescription/>
      </Suspense>
      <br />
      <Suspense fallback={<p>Loading tabs</p>}>
        <Tabs
          activeCategory={activeCategory}
          categories={categories}
        />
      </Suspense>
    </main>
  );
}
