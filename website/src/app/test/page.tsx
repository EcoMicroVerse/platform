import { requireComingSoonAccess } from "@/lib/comingSoon";

export default async function TestPage() {
  await requireComingSoonAccess("/test");
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold">Test Page Works</h1>
    </main>
  );
}