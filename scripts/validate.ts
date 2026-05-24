import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const registryRoot = process.cwd();
const brandsDir = path.join(registryRoot, "data", "brands");
const schemaPath = path.join(registryRoot, "schemas", "brand.schema.json");

async function readJson<T>(filePath: string): Promise<T> {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

async function main() {
  const schema = await readJson<object>(schemaPath);
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const files = (await readdir(brandsDir)).filter((file) => file.endsWith(".json"));
  let failed = false;

  for (const file of files) {
    const fullPath = path.join(brandsDir, file);
    const record = await readJson<any>(fullPath);
    const isValid = validate(record);

    if (!isValid) {
      failed = true;
      console.error(`\n${file} failed schema validation:`);
      console.error(validate.errors);
      continue;
    }

    const sourceIds = new Set(record.sources.map((source: { id: string }) => source.id));
    for (const colour of record.colours) {
      if (!sourceIds.has(colour.sourceId)) {
        failed = true;
        console.error(`\n${file} has colour '${colour.name}' with missing sourceId '${colour.sourceId}'.`);
      }
    }

    if (record.slug && file !== `${record.slug}.json`) {
      failed = true;
      console.error(`\n${file} should be named ${record.slug}.json to match its slug.`);
    }
  }

  if (failed) {
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${files.length} brand record(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
