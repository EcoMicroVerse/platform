
import EntityHoverCard from "./EntityHoverCard";
import { getEntityInfo } from "@/lib/entityIntelligence";

type Props = {
  name: string;
};

export default async function EntityLink({
  name,
}: Props) {
  const entity =
    await getEntityInfo(name);

  if (!entity) {
    return (
      <span className="text-teal-300">
        {name}
      </span>
    );
  }

  return (
    <EntityHoverCard entity={entity}/>
  );
}