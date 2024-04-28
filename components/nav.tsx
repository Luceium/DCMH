"use client";
import React, { useContext } from "react";
import NavAvatar from "./nav-avatar";
import isAdmin from "@/lib/is-admin";
import { EditContext } from "@/lib/context";
import { Toggle } from "./ui/toggle";
import useIsAdmin from "@/lib/useIsAdmin";

const Nav = () => {
  const { edit, setEdit } = useContext(EditContext);
  const { isAdmin } = useIsAdmin();

  return (
    <div className="fixed pt-4 right-4 top-0 flex gap-2 z-10">
      {isAdmin && (
        <>
          <Toggle pressed={edit} onPressedChange={() => setEdit(!edit)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </Toggle>
        </>
      )}
      <NavAvatar />
    </div>
  );
};

export default Nav;
