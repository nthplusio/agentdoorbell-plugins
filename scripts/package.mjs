import './validate.mjs';
import { cp, mkdir, mkdtemp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
await mkdir(join(root, '.local'), { recursive: true });
const parent = await mkdtemp(join(root, '.local/plugin-package-'));
const output = join(parent, 'agentdoorbell');
await mkdir(output);
for (const path of ['.cursor-plugin/plugin.json', 'mcp.json', 'assets/agentdoorbell.png', 'skills/agentdoorbell/SKILL.md', 'skills/agentdoorbell-wakeup/SKILL.md', 'README.md']) {
  await mkdir(join(output, path, '..'), { recursive: true });
  await cp(join(root, 'plugins/grokbot', path), join(output, path));
}
// Keep the README's acceptance link usable outside this repository's directory structure.
const { readFile, writeFile } = await import('node:fs/promises');
const readme = join(output, 'README.md');
await writeFile(readme, (await readFile(readme, 'utf8')).replace('../../docs/client-acceptance.md', 'https://github.com/nthplusio/agentdoorbell-plugins/blob/main/docs/client-acceptance.md'));
console.log(`Standalone plugin package: ${output}`);
