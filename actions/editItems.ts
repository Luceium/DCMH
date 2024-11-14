"use server";
import { formSchema } from "@/components/ui/itemCardForm";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import { produce } from "immer";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addCategory, getCategory } from "./categories";

export async function deleteItem(itemId: string) {
  const deleteItem = await prisma.item.delete({
    where: { id: itemId },
  });
  revalidatePath("/");
  return deleteItem;
}

export async function toggleItemPriority(itemId: string) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });
  if (!item) throw new Error(`Item with ID ${itemId} not found`);
  const currentPriority = item.priority;
  const prioritizedItem = await prisma.item.update({
    where: { id: itemId },
    data: { priority: !currentPriority },
  });
  revalidatePath("/");
  return prioritizedItem;
}

export async function addItem(item: Omit<Omit<Item, "priority">, "id">) {
  const newItem = await prisma.item.create({
    data: item,
  });
  revalidatePath("/");
  return newItem;
}

export async function updateItem(item: Omit<Item, "priority">) {
  const updatedItem = await prisma.item.update({
    where: { id: item.id },
    data: produce(
      item,
      (item: Omit<Omit<Item, "priority">, "id"> & { id?: string }) => {
        delete item.id;
      }
    ),
  });
  revalidatePath("/");
  return updatedItem;
}

/**
 * Submit an item to the database or update an existing item if an ID is found.
 * @param values - contains fresh values from the form.
 * @param category - specify the category tab the card will be included in.
 * @returns
 */
export async function submitItemFromForm(
  values: z.infer<typeof formSchema>,
  id?: string
) {
  const category = await getCategory(values.category);
  const categoryId = category?.id ?? "";
  if (!categoryId) return;

  const updatedValues: Omit<Item, "id" | "priority"> & { category?: string } = {
    ...values,
    categoryId,
  };
  delete updatedValues.category;
  const validatedValues: Omit<Item, "id" | "priority"> = updatedValues;

  return id
    ? await updateItem({ ...validatedValues, id })
    : await addItem(validatedValues);
}
