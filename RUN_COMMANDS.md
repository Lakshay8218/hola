# Run and Build Commands

## Install

```bash
npm install
```

## Local development

```bash
npm run dev
```

## Type check

```bash
npm run typecheck
```

## Production build

```bash
npm run build
```

The production output is written to `dist/client`, with the hosting worker at `dist/server/index.js` and deployment metadata at `dist/.openai/hosting.json`.

## Production preview

```bash
npm run preview
```

## Hosting worker tests

```bash
npm run test:sites
```
