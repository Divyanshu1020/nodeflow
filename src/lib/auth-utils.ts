import { ROUTES } from "@/constant";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect(ROUTES.SIGN_IN);
  }

  return session;
};

export const requireNoAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    redirect(ROUTES.WORKFLOW);
  }

  return session;
};
