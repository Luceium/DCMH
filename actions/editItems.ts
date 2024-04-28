"use server";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

export async function deleteItem(itemId: string) {
  return await prisma.item.delete({
    where: { id: itemId },
  });
}

export async function addItem(item: Omit<Item, "id">) {
  return await prisma.item.create({
    data: item,
  });
}

export async function addItemFromForm(formData: FormData, category: string) {
  const newItem = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    imageURL: formData.get("imageURL") as string,
    quantity: Number(formData.get("quantity")),
    targetQuantity: Number(formData.get("targetQuantity")),
    category: category,
  };

  return await addItem(newItem);
}
