import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type BrandColour = {
  name: string;
  hex: string;
  role: string;
};

type BrandRecord = {
  name: string;
  slug: string;
  colours: BrandColour[];
};

const registryRoot = process.cwd();
const brandsDir = path.join(registryRoot, "data", "brands");
const exportsDir = path.join(registryRoot, "exports");

async function readJson<T>(filePath: string): Promise<T> {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

function tokenName(brandSlug: string, colour: BrandColour) {
  const role = colour.role === "unknown" ? colour.name : colour.role;
  return `${brandSlug}-${role}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cssExport(brand: BrandRecord) {
  const lines = brand.colours.map((colour) => `  --brand-${tokenName(brand.slug, colour)}: ${colour.hex};`);
  return `:root {\n${lines.join("\n")}\n}\n`;
}

function scssExport(brand: BrandRecord) {
  return brand.colours
    .map((colour) => `$brand-${tokenName(brand.slug, colour)}: ${colour.hex};`)
    .join("\n") + "\n";
}

function tailwindExport(brand: BrandRecord) {
  const colours = Object.fromEntries(
    brand.colours.map((colour) => [tokenName(brand.slug, colour).replace(`${brand.slug}-`, ""), colour.hex]),
  );

  return `${JSON.stringify({ theme: { extend: { colors: { [brand.slug]: colours } } } }, null, 2)}\n`;
}

async function main() {
  const files = (await readdir(brandsDir)).filter((file) => file.endsWith(".json"));
  const brands = await Promise.all(files.map(async (file) => readJson<BrandRecord>(path.join(brandsDir, file))));

  for (const format of ["css", "scss", "tailwind"] as const) {
    await mkdir(path.join(exportsDir, format), { recursive: true });
  }

  for (const brand of brands) {
    await writeFile(path.join(exportsDir, "css", `${brand.slug}.css`), cssExport(brand), "utf8");
    await writeFile(path.join(exportsDir, "scss", `${brand.slug}.scss`), scssExport(brand), "utf8");
    await writeFile(path.join(exportsDir, "tailwind", `${brand.slug}.json`), tailwindExport(brand), "utf8");
  }

  console.log(`Generated exports for ${brands.length} brand record(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
