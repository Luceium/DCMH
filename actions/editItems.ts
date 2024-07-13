"use server";
import { formSchema } from "@/components/ui/itemCardForm";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function deleteItem(itemId: string) {
  const deleteItem = await prisma.item.delete({
    where: { id: itemId },
  });
  revalidatePath("/");
  return deleteItem;
}

export async function addItem(item: Omit<Item, "id">) {
  const newItem = await prisma.item.create({
    data: item,
  });
  revalidatePath("/");
  return newItem;
}

export async function addItemFromForm(
  values: z.infer<typeof formSchema>,
  category: string
) {
  const newItem = {
    ...values,
    category: category,
  };

  return await addItem(newItem);
}
