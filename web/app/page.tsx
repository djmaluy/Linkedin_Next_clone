"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import apiRouter from "@/app/api/router";

export default function Home() {
  const data = useQuery({
    queryKey: ["fethchUsers"],
    queryFn: apiRouter.users.fetchUsers,
  });

  return (
    <main className="">
      <h1>sjkhfkhjs hfsafhskj</h1>
      <Button>Click mee</Button>
    </main>
  );
}
