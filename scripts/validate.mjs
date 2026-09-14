import assert from 'node:assert/strict';
import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const json = async path => JSON.parse(await readFile(path, 'utf8'));
function inside(base, relative) {
  assert.equal(typeof relative, 'string');
  assert.ok(relative && !relative.startsWith('/') && !relative.split('/').includes('..'), `Unsafe path: ${relative}`);
  const result = resolve(base, relative);
  assert.ok(result.startsWith(resolve(base) + sep), `Path escapes package: ${relative}`);
  return result;
}
const marketplace = await json(resolve(root, '.cursor-plugin/marketplace.json'));
assert.equal(marketplace.name, 'agentdoorbell-plugins');
assert.ok(marketplace.owner.name);
assert.ok(marketplace.plugins.length > 0);
const names = new Set();
for (const entry of marketplace.plugins) {
  assert.ok(!names.has(entry.name), `Duplicate plugin: ${entry.name}`);
  names.add(entry.name);
  const base = inside(root, entry.source);
  const manifest = await json(resolve(base, '.cursor-plugin/plugin.json'));
  assert.equal(manifest.name, entry.name);
  assert.match(manifest.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.equal(manifest.repository, 'https://github.com/nthplusio/agentdoorbell-plugins');
  assert.equal(manifest.homepage, 'https://agentdoorbell.com');
  assert.ok((await stat(resolve(base, 'README.md'))).isFile());
  const logo = await readFile(inside(base, manifest.logo));
  assert.ok(logo.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), 'Logo must be a PNG');
  assert.ok(logo.length < 300_000, 'Keep the plugin logo lightweight');
  const mcp = await json(inside(base, manifest.mcpServers));
  assert.deepEqual(mcp, { mcpServers: { agentdoorbell: { url: '${NOTIFIER_MCP_URL}' } } });
  assert.equal(manifest.variables.type, 'object');
  assert.deepEqual(manifest.variables.required, ['NOTIFIER_MCP_URL']);
  assert.equal(manifest.variables.properties.NOTIFIER_MCP_URL.default, 'https://agentdoorbell.com/mcp');
  const skills = inside(base, manifest.skills);
  for (const name of await readdir(skills)) {
    const skill = await readFile(resolve(skills, name, 'SKILL.md'), 'utf8');
    assert.ok(skill.startsWith(`---\nname: ${name}\ndescription:`), `Invalid skill frontmatter: ${name}`);
    assert.match(skill, /\n---\n/);
  }
}
console.log(`Validated ${names.size} plugin package(s). Actual client acceptance remains a separate check.`);
