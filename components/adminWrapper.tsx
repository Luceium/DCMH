"use client";
import isAdmin from '@/lib/is-admin';
import React, { ReactNode, useState } from 'react'

const AdminWrapper = ({children} : {children: ReactNode}) => {


  const [admin, setAdmin] = useState(false);
  isAdmin().then((value) => setAdmin(value));
  return (
    
    <>
      {admin ?? children}
    </>
  )
}

export default AdminWrapper