import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { Email } from "@prisma/client";

export default async function addToMailingList(email: string) {
  // Update db
  prisma.email.create({ data: { email: email } });

  // send initial thank you letter
  const resend = new Resend(process.env.RESEND_API);
  resend.emails.send({
    from: "DCMH@pantrypatrol.tech",
    to: email,
    subject: "Thanks for joining us!",
    html: "<p>Thanks for joining our mailing list! We'll keep you updated on all the latest news and events.<br>We appreciate all our donors and are honored that you want to know when we need more donations.</p>",
    headers: {
      "List-Unsubscribe": "<https://pantrypatrol.tech/unsubscribe>",
    },
  });
}
