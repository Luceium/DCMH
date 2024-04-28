import Card from "@/components/card";
import MainPageTabs from "@/components/MainPageTabs";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import EditQuantityModal from "@/components/ItemCard";

async function getItems() {
  const itemsByCategory: Record<string, Item[]> = {};

  const items = await prisma.item.findMany({});
  items.forEach((item) => {
    if (!itemsByCategory[item.category]) itemsByCategory[item.category] = [];
    itemsByCategory[item.category].push(item);
  });
  return itemsByCategory;
}

export default async function Home() {
  const items = await getItems();

  return <MainPageTabs items={items} />;
}
