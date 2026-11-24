import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const entry =
  "I ran a million simulations of this conversation. In every one, I still walk over and say hello.";

async function main(): Promise<void> {
  // Gate: the entry must be a single line of 1-200 characters.
  const lines = entry.split("\n");
  if (lines.length !== 1 || entry.length < 1 || entry.length > 200) {
    throw new Error(`entry fails the gate: ${entry.length} chars, ${lines.length} lines`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "entry.txt"), entry, "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
