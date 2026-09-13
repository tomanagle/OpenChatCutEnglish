# Local English setup

This checkout uses English on first launch and for server messages when no language
is configured. The agent follows the interface language, including progress updates,
even when a tool or skill returns text in another language. An explicitly selected
interface language is still respected; source material is not automatically translated.

Use Node.js 24, as required by this repository. With `fnm` installed:

```sh
cd /Users/tom/projects/OpenChatCut
fnm exec --using=24 npm run build
fnm exec --using=24 npm run desktop:dev
```

Rebuild after changing frontend code when using the desktop's bundled interface.
For browser development with live updates:

```sh
fnm exec --using=24 npm run dev
```

Open the local URL printed in the terminal. The checkout has its own development
profile under `~/.openchatcut/dev-profiles/`; configure your preferred agent provider
in Settings → Agent model. Existing OpenChatCut Pro projects and credentials are
not automatically imported into this separate application.

To use the desktop window with live updates, leave the browser development server
running, then launch a second terminal with:

```sh
cd /Users/tom/projects/OpenChatCut
CC_DESKTOP_DEV_URL=http://127.0.0.1:5199 fnm exec --using=24 npm run desktop:dev
```

The language control in the title bar should display **EN**. It cycles through
languages when clicked; leave it on EN for English interface text and agent replies.

Language changes are on the `english-defaults` branch. This is a focused fix for
language defaults and agent instructions, not a complete translation of every
upstream message or third-party resource.
