"use server";

import prisma from "@/lib/prisma";
import { Description } from "@prisma/client";

export async function getDescription(): Promise<Description> {
  const description = await prisma.description.findFirst();
  return description ? description : { text: "No description", id: "0" };
}

export async function updateDescription(text: string) {
  const existingDescription = await prisma.description.findFirst();
  if (existingDescription) {
    await prisma.description.update({
      where: {
        id: existingDescription.id,
      },
      data: {
        text,
      },
    });
  } else {
    await prisma.description.create({
      data: {
        text,
      },
    });
  }
}
