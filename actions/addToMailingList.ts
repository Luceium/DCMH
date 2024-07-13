import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { Email } from "@prisma/client";

export default async function addToMailingList(email: string) {
  const resend = new Resend(process.env.RESEND_API);
  await Promise.all([
    prisma.email.create({ data: { email: email } }),
    resend.emails.send({
      from: "DCMH@pantrypatrol.tech",
      to: email,
      subject: "Thanks for joining us!",
      html: `<p>Thanks for joining our mailing list! We'll keep you updated on all the latest news and events.<br>We appreciate all our donors and are honored that you want to know when we need more donations.<br>Feel free to <a href='https://pantrypatrol.tech/unsubscribe?email="${email}"'>unsubscribe</a> at any time </p>`,
      headers: {
        "List-Unsubscribe":
          "<https://pantry.daviscoummunitymeals.org/unsubscribe>",
      },
    }),
  ]);
}
