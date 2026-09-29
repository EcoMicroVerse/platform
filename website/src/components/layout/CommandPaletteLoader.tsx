
import CommandPalette from "./CommandPalette";
import { getCommandIndex } from "@/lib/commandIndex";

export default async function CommandPaletteLoader() {
  const commands =
    await getCommandIndex();

  return (
    <CommandPalette commands={commands}/>
  );
}