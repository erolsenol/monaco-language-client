# Monaco SQL editor experiment

A React and TypeScript experiment using Monaco Editor and the TypeFox Monaco wrapper to render a SQL editor. The language client connection is commented out in the current source; this repository does not provide a running language server.

> **Status:** Reference experiment, not a maintained editor product.

## Run locally

```sh
npm ci
npm start
```

`npm run build` checks the production bundle. CI runs this build on Node.js 22. The project uses Create React App and older dependencies; its dependency audit reports known vulnerabilities. Review dependency and browser compatibility before reusing it.

## Structure

- `src/App.tsx` registers the SQL language and configures the editor wrapper.
- `src/index.css` contains the editor layout.

No license is granted in this repository.
