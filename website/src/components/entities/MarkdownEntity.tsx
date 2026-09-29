
"use client";

import EntityHoverCard from "./EntityHoverCard";

type Props = {
  name: string;
  entity: any;
};

export default function MarkdownEntity({
  name,
  entity,
}: Props) {
  if (!entity) {
    return <>{name}</>;
  }

  return (
    <EntityHoverCard entity={entity}/>
  );
}