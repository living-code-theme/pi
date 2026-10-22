"""Display a clearly labeled local fixture in Pi's real conversation UI, offline."""
import json


def prepare(c):
    c.git_fixture()
    c.env.update(ANTHROPIC_API_KEY='capture-not-a-real-key', ANTHROPIC_BASE_URL='http://127.0.0.1:9')
    c.copy(f'themes/{c.slug}.json', f'.pi/agent/themes/{c.slug}.json')
    c.write('.pi/agent/settings.json', json.dumps({'theme': c.slug, 'quietStartup': True}))
    timestamp = '2026-01-01T12:00:00.000Z'
    header = {'type': 'session', 'version': 3, 'id': 'living-code-capture', 'timestamp': timestamp, 'cwd': str(c.work)}
    user = {'type': 'message', 'id': '11111111', 'parentId': None, 'timestamp': timestamp,
            'message': {'role': 'user', 'content': 'Show the glyph renderer — offline screenshot fixture.', 'timestamp': 1767268800000}}
    text = '''## Glyph field\n\nThis is **local fixture content**, rendered by Pi without a model request.\n\n```typescript\nconst RADIUS = 0.35;\nexport async function render(field: GlyphField) {\n  if (!field.gpu) return fallback();\n  await field.animate({ opacity: 1, ease: "power3.out" });\n  return field.cells.length;\n}\n```\n\n- Types, functions and values stay distinct.\n- Muted surfaces keep the code in focus.\n'''
    assistant = {'type': 'message', 'id': '22222222', 'parentId': '11111111', 'timestamp': timestamp,
        'message': {'role': 'assistant', 'content': [{'type': 'text', 'text': text}], 'api': 'anthropic-messages',
            'provider': 'anthropic', 'model': 'claude-sonnet-4-5', 'stopReason': 'stop', 'timestamp': 1767268800000,
            'usage': {'input': 0, 'output': 0, 'cacheRead': 0, 'cacheWrite': 0, 'totalTokens': 0,
                      'cost': {'input': 0, 'output': 0, 'cacheRead': 0, 'cacheWrite': 0, 'total': 0}}}}
    session = c.write('fixture.jsonl', '\n'.join(json.dumps(x) for x in (header, user, assistant)) + '\n')
    return ['pi', '--offline', '--no-extensions', '--no-skills', '--no-prompt-templates', '--no-context-files',
            '--no-approve', '--session', session, '--use-theme', c.slug]


def drive(c):
    c.wait_text(r'local fixture content|Types, functions')
