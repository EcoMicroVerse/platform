import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/authorization";

export async function requireComingSoonAccess(nextPath: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}
