import { Suspense } from "react";
import EditableDescription from "@/components/description";
import { fetchItems, fetchPriorityItems } from "@/actions/fetchItems";
import { getCategories, getCategoryName } from "@/actions/categories";
import { getDescription } from "@/actions/description";
import Tabs from "@/components/tabs";

export default async function Page(props: {
  searchParams: Promise<{
    tab?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const description = await getDescription();
  const activeCategory = searchParams.tab || "PRIORITY_ITEMS";
  const items =
    activeCategory === "PRIORITY_ITEMS"
      ? await fetchPriorityItems()
      : await fetchItems(activeCategory);
  const categories = await getCategories();

  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<p>Loading description</p>}>
        <EditableDescription description={description} />
      </Suspense>
      <br />
      <Suspense fallback={<p>Loading tabs</p>}>
        <Tabs
          activeCategory={activeCategory}
          items={items}
          categories={categories}
        />
      </Suspense>
    </main>
  );
}
