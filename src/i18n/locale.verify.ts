import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

// Check first-launch behavior in a fresh module graph, including a non-English OS.
for (const stored of [null, 'invalid']) {
  const result = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { language: 'zh-CN' } });
    globalThis.localStorage = { getItem: () => ${JSON.stringify(stored)} };
    const { getLocale } = await import('./src/i18n/locale.ts');
    assert.equal(getLocale(), 'en');
  `], { cwd: new URL('../..', import.meta.url), encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || 'first launch must default to English');
}

const documentElement = { lang: 'en' };
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: { getItem: () => 'it', setItem: () => undefined },
});
Object.defineProperty(globalThis, 'document', {
  configurable: true,
  value: { documentElement },
});

const { getLocale, setLocale } = await import('./locale');
assert.equal(getLocale(), 'it');
assert.equal(documentElement.lang, 'it', 'the persisted locale must set the initial document language');
setLocale('zh');
assert.equal(documentElement.lang, 'zh-CN');

console.log('locale.verify: persisted and changed locales update the document language');
