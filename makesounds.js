import { CSV } from "https://js.sabae.cc/CSV.js";
import { MML } from "https://ichigojam.github.io/MML/MML.js";

const sounds = await CSV.fetchJSON("sounds.mml.csv");
for (const s of sounds) {
  const wav = MML.encode(s.mml);
  await Deno.writeFile("sounds/" + s.name + ".wav", wav);
}
