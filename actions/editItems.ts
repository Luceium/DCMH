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

export async function addItem(
  item: Omit<Item, "priority" | "id">
): Promise<Item> {
  const newItem = await prisma.item.create({
    data: {
      ...cleanItem(item),
      category: {
        connect: {
          id: item.categoryId,
        },
      },
    },
  });
  revalidatePath("/");
  return newItem;
}

export async function updateItem(item: Omit<Item, "priority">): Promise<Item> {
  const updatedItem = await prisma.item.update({
    where: { id: item.id },
    data: {
      ...cleanItem(item),
      category: {
        connect: {
          id: item.categoryId,
        },
      },
    },
  });
  revalidatePath("/");
  return updatedItem;
}

const cleanItem = (
  item: Omit<Item, "priority" | "id" | "categoryId"> & {
    priority?: boolean;
    id?: string;
    categoryId?: string;
  }
) =>
  produce(item, (draft) => {
    delete draft.id;
    delete draft.categoryId;
  }) as Omit<Item, "id" | "categoryId"> & { priority?: boolean };

export async function star(id: string, priority: boolean): Promise<Item> {
  const item = await prisma.item.update({
    where: { id },
    data: { priority },
  });
  revalidatePath("/");
  return item;
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
  return id ? await updateItem({ ...values, id }) : await addItem(values);
}
