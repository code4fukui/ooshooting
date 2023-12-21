import { PNG } from "https://code4fukui.github.io/PNG/PNG.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const fns = await dir2array("images_pancake");
for (const fn of fns) {
  if (!fn.endsWith(".png")) continue;
  const png = PNG.decode(await Deno.readFile("images/" + fn));
  console.log(png);
  const d = png.data;
  const p = png.width * 4 * (png.height - 1) + (png.width - 1) * 4; // right bottom
  for (let i = 0; i < d.length; i += 4) {
    if (d[i] == d[p] && d[i + 1] == d[p + 1] && d[i + 2] == d[p + 2]) {
      d[i + 3] = 0;
    }
  }
  await Deno.writeFile("images/" + fn, PNG.encode(png));
}
