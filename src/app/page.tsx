"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data } = authClient.useSession();
  return (
    <div className="text-3xl font-bold underline h-screen flex items-center justify-center">
      {JSON.stringify(data)}
      {data && <Button onClick={() => authClient.signOut()}>Logout</Button>}
    </div>
  );
}
