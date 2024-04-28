"use client";
import { createContext, useState } from "react";

export const EditContext = createContext({
  edit: false,
  setEdit: (edit: boolean) => {},
});

export function EditContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <EditContext.Provider value={{ edit, setEdit }}>
      {children}
    </EditContext.Provider>
  );
}
