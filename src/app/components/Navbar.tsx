"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className=" bg-black w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Giphy App
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {session?.data?.user ? (
            <button className="text-white" onClick={() => signOut()}>
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-purple-700 hover:bg-purple-800   font-medium rounded-lg text-sm px-4 py-2 text-center "
              onClick={() => router.push("signin")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
