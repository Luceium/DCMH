"use server";

import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

export async function fetchItem(itemId: string) {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });
  return item;
}

export async function fetchItems() {
  const itemsByCategory: Record<string, Item[]> = {};

  const items = await prisma.item.findMany({});
  items.forEach((item) => {
    if (!itemsByCategory[item.category]) itemsByCategory[item.category] = [];
    itemsByCategory[item.category].push(item);
  });
  return itemsByCategory;
}
