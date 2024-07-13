"use server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import isAdmin from "@/lib/is-admin";
import { revalidatePath } from "next/cache";

export async function updateQuantities(
  itemId: string,
  quantity: number,
  targetQuantity: number
) {
  if (!(await isAdmin())) {
    throw new Error("You do not have permission to perform this action");
  }

  const item = await prisma.item.update({
    where: { id: itemId },
    data: { quantity, targetQuantity },
  });
  revalidatePath("/");
  return item;
}
