import { requireComingSoonAccess } from "@/lib/comingSoon";
import SearchClient from "./SearchClient";

export default async function SearchPage() {
  await requireComingSoonAccess("/search");

  return <SearchClient />;
}
