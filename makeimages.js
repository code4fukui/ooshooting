import { PNG } from "https://code4fukui.github.io/PNG/PNG.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const fns = await dir2array("images");
const list = {};
for (const fn of fns) {
  if (!fn.endsWith(".png")) continue;
  const png = PNG.decode(await Deno.readFile("images/" + fn));
  list[fn] = { width: png.width, height: png.height };
}
console.log(list);
const src = `export const images = ${JSON.stringify(list, null, 2)};\n`;
await Deno.writeTextFile("images.js", src);
