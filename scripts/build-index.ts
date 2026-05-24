import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const registryRoot = process.cwd();
const brandsDir = path.join(registryRoot, "data", "brands");
const distDir = path.join(registryRoot, "dist");
const indexPath = path.join(distDir, "index.json");

async function readJson<T>(filePath: string): Promise<T> {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

async function main() {
  const files = (await readdir(brandsDir)).filter((file) => file.endsWith(".json"));
  const brands = await Promise.all(
    files.map(async (file) => readJson<Record<string, unknown>>(path.join(brandsDir, file))),
  );

  brands.sort((a, b) => String(a.name).localeCompare(String(b.name)));

  await mkdir(distDir, { recursive: true });
  await writeFile(
    indexPath,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), brands }, null, 2)}\n`,
    "utf8",
  );

  console.log(`Built ${path.relative(registryRoot, indexPath)} with ${brands.length} brand record(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
