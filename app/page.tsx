import Card from "@/components/card";
import MainPageTabs from "@/components/MainPageTabs";
import prisma from "@/lib/prisma";
import { Item, Category } from "@prisma/client";
import EditQuantityModal from "@/components/ItemCard";

async function getItems() {
  const medicineItems = await prisma.item.findMany({
    where: { category: Category.MEDICINE },
  });

  const food_suppliesItems = await prisma.item.findMany({
    where: { category: Category.FOOD_SUPPLIES },
  });

  const cleaning_suppliesItems = await prisma.item.findMany({
    where: { category: Category.CLEANING_SANITIZING },
  });

  const hygieneItems = await prisma.item.findMany({
    where: { category: Category.HYGIENE },
  });

  return {
    medicineItems,
    food_suppliesItems,
    cleaning_suppliesItems,
    hygieneItems,
  };
}

export default async function Home() {
  const {
    medicineItems,
    food_suppliesItems,
    cleaning_suppliesItems,
    hygieneItems,
  } = await getItems();

  return (
    <MainPageTabs
      medicineItems={medicineItems}
      food_suppliesItems={food_suppliesItems}
      cleaning_suppliesItems={cleaning_suppliesItems}
      hygieneItems={hygieneItems}
    />
  );
}
