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
  return await prisma.item.findMany({});
}
