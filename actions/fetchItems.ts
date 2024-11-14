"use server";

import prisma from "@/lib/prisma";
import { getCategory } from "./categories";

export async function fetchItem(itemId: string) {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });
  return item;
}

export async function fetchItems(category: string) {
  const categoryId = (await getCategory(category))?.id;
  if (!categoryId) return [];
  return await prisma.item.findMany({
    where: {
      categoryId: category,
    },
  });
}

export async function fetchPriorityItems() {
  return await prisma.item.findMany({
    where: {
      priority: true,
    },
  });
}
