import { getAllEntities } from "@/lib/entityIntelligence";
import MarkdownEntity from "./MarkdownEntity";

export async function createMarkdownComponents() {
  const entities = await getAllEntities();

  const lookup = new Map(
    entities.map((entity) => [
      entity.name.toLowerCase(),
      entity,
    ])
  );

  return {
    text(props: any) {
      const value = String(props.children ?? "");

      const words = value.split(/(\s+)/);

      return (
        <>
          {words.map((word: string, index: number) => {
            const clean = word.replace(/[.,;:()]/g, "");

            const entity = lookup.get(clean.toLowerCase());

            if (!entity) {
              return <span key={index}>{word}</span>;
            }

            return (
              <MarkdownEntity
                key={index}
                name={word}
                entity={entity}
              />
            );
          })}
        </>
      );
    },

    // Preserve inline code exactly as written
    code(props: any) {
      return <code {...props} />;
    },

    // Preserve fenced code blocks
    pre(props: any) {
      return <pre {...props} />;
    },

    // Preserve hyperlinks and citations
    a(props: any) {
      return <a {...props} />;
    },
  };
}