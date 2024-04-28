import MainPageTabs from "@/components/MainPageTabs";
import { fetchItems } from "@/actions/fetchItems";

export default async function Home() {
  const items = await fetchItems();

  return <MainPageTabs items={items} />;
}
