"use server";
import prisma from "@/lib/prisma";

export async function deleteItem(itemId: string) {
  return await prisma.item.delete({
    where: { id: itemId },
  });
}
