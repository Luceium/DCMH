import Card from "@/components/card";
import MainPageTabs from "@/components/MainPageTabs";
import prisma from "@/lib/prisma";
import { Item, Category } from "@prisma/client";
import EditQuantityModal from "@/components/ItemCard";

async function getItems() {
  const itemsByCategory: Record<Category, Item[]> = {
    [Category.MEDICINE]: [],
    [Category.FOOD_SUPPLIES]: [],
    [Category.CLEANING_SANITIZING]: [],
    [Category.HYGIENE]: [],
  };

  const items = await prisma.item.findMany({});
  items.forEach((item) => {
    itemsByCategory[item.category].push(item);
  });
  return itemsByCategory;
}

export default async function Home() {
  const items = await getItems();

  return <MainPageTabs items={items} />;
}
