import prisma from "@/lib/prisma";
import { Email } from "@prisma/client";

export default async function addToMailingList(email: string) {
  // Update db
  prisma.email.create({ data: { email: email } });

  // send initial thank you letter
}
