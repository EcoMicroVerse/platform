
import { getAllEntities } from "./entityIntelligence";
import { loadApproved } from "./dashboard";

export type CommandItem = {
  title: string;
  route: string;
  category: string;
};

export async function getCommandIndex() {
  const entities =
    await getAllEntities();

  const approved =
    await loadApproved();

  const commands: CommandItem[] = [
    {
      title: "Knowledge Graph",
      route: "/graph",
      category: "Navigation",
    },
    {
      title: "Today's Discovery",
      route: "/",
      category: "Navigation",
    },
    {
      title: "Workspace",
      route: "/workspace",
      category: "Navigation",
    },
  ];

  entities.forEach((entity) => {
    commands.push({
      title: entity.name,
      route: `/entities/${entity.name}`,
      category: entity.type,
    });
  });

  approved.forEach((article: any) => {
    commands.push({
      title: article.title,
      route: `/articles/${
        article.emv_id ??
        article.id
      }`,
      category: "Research Object",
    });
  });

  return commands;
}