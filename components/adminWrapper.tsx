"use client";
import isAdmin from '@/lib/is-admin';
import useIsAdmin from '@/lib/useIsAdmin';
import React, { ReactNode, useState } from 'react'

const AdminWrapper = ({children} : {children: ReactNode}) => {


  const {loading, isAdmin} = useIsAdmin();
  return (
    
    <>
      {isAdmin && children}
    </>
  )
}

export default AdminWrapper