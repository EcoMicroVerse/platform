
import EntityLink from "@/components/entities/EntityLink";

type Piece =
  | string
  | {
      type: "entity";
      value: string;
    };

export async function highlightEntities(
  text: string,
  entityNames: string[]
) {
  if (!text) return text;

  const sorted = [...entityNames].sort(
    (a, b) => b.length - a.length
  );

  let pieces: Piece[] = [text];

  for (const entity of sorted) {
    const regex = new RegExp(
      `\\b${entity.replace(
        /[-/\\^$*+?.()|[\]{}]/g,
        "\\$&"
      )}\\b`,
      "gi"
    );

    const next: Piece[] = [];

    for (const piece of pieces) {
      if (typeof piece !== "string") {
        next.push(piece);
        continue;
      }

      let last = 0;

      for (const match of piece.matchAll(regex)) {
        const start = match.index ?? 0;

        if (start > last) {
          next.push(piece.slice(last, start));
        }

        next.push({
          type: "entity",
          value: match[0],
        });

        last = start + match[0].length;
      }

      if (last < piece.length) {
        next.push(piece.slice(last));
      }
    }

    pieces = next;
  }

  return Promise.all(
    pieces.map(async (piece, index) => {
      if (typeof piece === "string") {
        return (
          <span key={index}>{piece}</span>
        );
      }

      return (
        <EntityLink
          key={index}
          name={piece.value}
        />
      );
    })
  );
}