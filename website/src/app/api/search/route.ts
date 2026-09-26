import fs from "fs/promises";
import path from "path";

const ROOT = path.resolve(process.cwd(),"..");

export async function GET(req:Request){

  const url=new URL(req.url);

  const q=(url.searchParams.get("q")??"").toLowerCase();

  const file=path.join(
    ROOT,
    "content",
    "search",
    "search_index.json"
  );

  const data=JSON.parse(
    await fs.readFile(file,"utf8")
  );

  if(!q){

    return Response.json([]);

  }

  const results=data
    .map((item:any)=>{

      let score=0;

      if(item.title.toLowerCase().includes(q))
        score+=5;

      if(item.summary.toLowerCase().includes(q))
        score+=3;

      item.methods.forEach((m:string)=>{

        if(m.toLowerCase().includes(q))
          score+=4;

      });

      item.profiles.forEach((p:string)=>{

        if(p.toLowerCase().includes(q))
          score+=2;

      });

      return{
        ...item,
        searchScore:score,
      };

    })
    .filter((item:any)=>item.searchScore>0)
    .sort((a:any,b:any)=>b.searchScore-a.searchScore);

  return Response.json(results);

}
