# Monaco SQL editor experiment

A small React and TypeScript SQL scratchpad built with Monaco Editor and Vite. It demonstrates a local editing surface; it does not execute queries or connect to a language server.

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Run `npm run build` to typecheck and create the production bundle. `npm audit` checks the dependency tree.

The previous Create React App and TypeFox wrapper were replaced because this experiment never enabled its language server connection. If you need an LSP integration, add a real server and a tested client contract rather than assuming this editor provides one.

No license is granted in this repository.
