<!-- living-code-readme:1 -->
# 🥧 Living Code for Pi

**Calm slate. Living color.** Living Code for Pi: schema-complete custom themes for messages, tools, thinking levels, syntax, Markdown and HTML exports.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

Real application screenshots have not been captured yet.

## Installation

Install as a theme-only Pi package:

```sh
pi install git:github.com/living-code-theme/pi
```

Run `/reload` and choose `living-code-night` under `/settings` → **Theme**. Alternatively, copy `themes/*.json` into `~/.pi/agent/themes/` (or your custom `PI_CODING_AGENT_DIR` followed by `/themes/`).

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

A real application capture is not available yet.

```sh
pi --use-theme living-code-night
```

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

A real application capture is not available yet.

```sh
pi --use-theme living-code-frost
```

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

A real application capture is not available yet.

```sh
pi --use-theme living-code-paper
```

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

A real application capture is not available yet.

```sh
pi --use-theme living-code-signal
```

</details>

## Configuration

Themes include every required color and the optional search, scrollbar and maximum-thinking colors. Export page/panel backgrounds are explicit. In `~/.pi/agent/settings.json`, `"theme": "living-code-paper/living-code-night"` follows the terminal appearance, with the light theme first. Package resources declare only themes: no tools, extensions or prompts are installed.

## Compatibility

Verified against the Pi 1.1.0 theme schema and native JSON validator. Requires a Pi release supporting these theme roles. User themes hot-reload when the theme name matches the JSON filename; package themes can be refreshed with `/reload`. Project-scoped resources require project trust. Truecolor is recommended. No provider login or model call is needed to use or validate the theme.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/pi/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque. The bundled upstream Pi theme schema is [MIT](test/fixtures/PI-LICENSE) © Mario Zechner.
