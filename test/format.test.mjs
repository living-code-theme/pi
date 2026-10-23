import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { resolveAll, sha256 } from '../scripts/palette.mjs';
import { keys, hexColors, assertContrast } from './helpers.mjs';
const fixture = JSON.parse(await readFile(new URL('./fixtures/upstream.json', import.meta.url)));
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
import Ajv from 'ajv';

const schemaBytes = await readFile(new URL('./fixtures/theme.schema.json', import.meta.url));
assert.equal(sha256(schemaBytes), fixture.schemaSha256, 'Keep the schema byte-identical to the reviewed Pi revision');
const schema = JSON.parse(schemaBytes);
const validate = new Ajv({ strict: false }).compile(schema);
for (const f of resolveAll()) test(f.name + ': upstream Pi schema, all optional colors and exports', async () => {
  const theme = JSON.parse(await read('themes/' + f.slug + '.json'));
  assert.ok(validate(theme), JSON.stringify(validate.errors));
  assert.equal(theme.name, f.slug);
  assert.equal(theme.appearance, f.light ? 'light' : 'dark');
  keys(theme.colors, Object.keys(schema.properties.colors.properties));
  hexColors(theme.colors); hexColors(theme.export);
  for (const [key, role] of Object.entries({ accent: 'accent', text: 'fg', syntaxKeyword: 'keyword', syntaxVariable: 'variable', syntaxNumber: 'number', syntaxType: 'type', syntaxString: 'string', toolDiffAdded: 'added', toolDiffRemoved: 'removed', mdCode: 'code' })) assert.equal(theme.colors[key], f.r(role), key);
  for (const key of ['userMessageBg', 'customMessageBg', 'toolPendingBg', 'toolSuccessBg', 'toolErrorBg', 'selectedBg']) assertContrast(theme.colors.text, theme.colors[key]);
  assertContrast(theme.colors.searchMatchText, theme.colors.searchMatchBg);
  assert.equal(theme.export.pageBg, f.r('bg'));
  const pkg = JSON.parse(await read('package.json'));
  const { themes, extensions, skills, prompts } = pkg.pi;
  assert.deepEqual({ themes, extensions, skills, prompts }, { themes: ['themes/*.json'], extensions: [], skills: [], prompts: [] });
});
