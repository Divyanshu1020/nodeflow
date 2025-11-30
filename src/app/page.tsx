"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constant";

export default function Home() {
  const router = useRouter();
  return (
    <div className="text-3xl font-bold underline h-screen flex items-center justify-center">
      <Button onClick={() => router.push(ROUTES.WORKFLOWS)}>Workflow</Button>
    </div>
  );
}
