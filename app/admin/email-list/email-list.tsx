'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getEmails } from '@/actions/getEmails'

export default function EmailList() {
  const [emails, setEmails] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEmails() {
      try {
        const fetchedEmails = await getEmails()
        setEmails(fetchedEmails)
      } catch (err) {
        setError('Failed to load emails. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmails()
  }, [])

  const handleCopyEmails = async () => {
    const textToCopy = emails.join(',');
    navigator.clipboard.writeText(textToCopy);

  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Email List</h1>
      <ul className="mb-4 list-disc pl-5">
        {emails.map((email, index) => (
          <p key={index} className="mb-1">{email}</p>
        ))}
      </ul>
      <Button onClick={handleCopyEmails}>
        Copy
      </Button>
    </div>
  )
}