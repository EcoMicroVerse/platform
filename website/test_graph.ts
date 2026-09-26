import {
  findNodeByTitle,
  findConnectedPapers,
} from "./src/lib/graph";

async function run() {

  const node = await findNodeByTitle("Tool Intelligence");

  console.log("Node:", node);

  if (node) {

    const papers = await findConnectedPapers(node.id);

    console.log("\nConnected Papers:");

    papers.forEach((paper: any) => {
      console.log("-", paper.title);
    });

  }

}

run();