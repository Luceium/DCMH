"use server";

import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

export async function fetchItem(itemId: string): Promise<Item | null> {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });
  return item;
}

export async function fetchItems(categoryId: string): Promise<Item[]> {
  return await prisma.item.findMany({
    where: {
      categoryId,
    },
  });
}

export async function fetchPriorityItems(): Promise<Item[]> {
  return await prisma.item.findMany({
    where: {
      priority: true,
    },
  });
}
