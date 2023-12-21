"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import GiphySearch from "./components/GiphySearch";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <div className="h-[calc(100vh-68px)] w-11/12 m-auto px-2 py-4">
      <div className=" h-fit w-full p-4 bg-white rounded-lg">
        <GiphySearch/>
      </div>
    </div>
  );
}

Home.requireAuth = true;
