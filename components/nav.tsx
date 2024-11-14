"use client";
import React, { useContext } from "react";
import NavAvatar from "./nav-avatar";
import isAdmin from "@/lib/is-admin";
import { EditContext } from "@/lib/context";
import { Toggle } from "./ui/toggle";
import useIsAdmin from "@/lib/useIsAdmin";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { edit, setEdit } = useContext(EditContext);
  const { isAdmin } = useIsAdmin();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="https://daviscommunitymeals.org">
            <Image
              src="/images/dcmh.png"
              alt="DCMH Logo"
              width={100}
              height={100}
            />
          </Link>
          <h1 className="text-2xl font-bold text-secondary dark:text-blue-300">
            Pantry
          </h1>
          <div className="flex gap-4">
            {isAdmin && (
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
            )}
            <NavAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
