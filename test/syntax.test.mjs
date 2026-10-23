import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { resolveAll } from '../scripts/palette.mjs';
const reference = JSON.parse(await readFile(new URL('./fixtures/neovim-syntax.json', import.meta.url)));
const roles = {
  syntaxComment: 'comment', syntaxKeyword: 'keyword', syntaxFunction: 'function',
  syntaxVariable: 'variable', syntaxString: 'string', syntaxNumber: 'number',
  syntaxType: 'type', syntaxOperator: 'operator', syntaxPunctuation: 'punctuation',
};
for (const f of resolveAll()) test(`${f.name}: all nine native syntax roles match Neovim`, async () => {
  const theme = JSON.parse(await readFile(new URL(`../themes/${f.slug}.json`, import.meta.url)));
  for (const [role, color] of Object.entries(reference.flavors[f.id])) assert.equal(f.r(role), color, role);
  for (const [key, role] of Object.entries(roles)) assert.equal(theme.colors[key], reference.flavors[f.id][role], key);
});
