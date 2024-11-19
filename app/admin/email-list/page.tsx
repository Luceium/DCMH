import isAdmin from "@/lib/is-admin"
import { notFound } from "next/navigation"
import EmailList from './email-list'

export default async function AdminEmailListPage() {
  if (!(await isAdmin())) {
    notFound()
  }

  return <EmailList />
}