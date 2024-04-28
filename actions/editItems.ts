"use server";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

export async function deleteItem(itemId: string) {
  return await prisma.item.delete({
    where: { id: itemId },
  });
}

export async function addItem(item: Item) {
  return await prisma.item.create({
    data: item,
  });
}
