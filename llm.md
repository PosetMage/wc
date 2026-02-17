# LLM Context: Svelte 5 Web Component Library

This document provides context for AI assistants to understand and work with this repository.

## Project Overview

This is a **Svelte 5 Web Components library** that compiles Svelte components into framework-agnostic web components (custom elements). The compiled ES modules can be loaded via `<script type="module">` in any HTML page.

**Repository**: BianJiaoPie/wc
**Deployment URL**: `https://posetmage.com/wc/`
**License**: MIT

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Svelte | 5.39+ | Component framework with `customElement: true` |
| Vite | 7.1+ | Build tool and dev server |
| TypeScript | 5.9+ | Type safety |
| Tailwind CSS | 4.1+ | Utility CSS (available but minimally used) |
| Node.js | 24 | Runtime (Docker images) |

## Project Structure

```
wc/
├── src/
│   ├── doc_ui/              # Documentation UI components
│   │   ├── main.ts          # Entry point → doc_ui.es.js
│   │   ├── sidebar.svelte   # <sidebar-component>
│   │   ├── table-of-contents.svelte  # <table-of-contents>
│   │   └── heading-id-injector.svelte # <heading-id-injector>
│   │
│   ├── slides/              # Slide presentation components
│   │   ├── main.ts          # Entry point → slides.es.js
│   │   ├── slides-component.svelte  # <slides-component>
│   │   ├── slides-ui.svelte # <slides-ui> (navigation buttons)
│   │   ├── slides-env.svelte # <slides-env> (slide environment)
│   │   ├── table-of-slides.svelte # <table-of-slides>
│   │   └── slide.store.ts   # Svelte store for slide state
│   │
│   ├── wc/                  # Example/demo components
│   │   ├── main.ts          # Entry point → wc.es.js
│   │   └── HelloWorld.svelte # <hello-world>
│   │
│   └── algo/                # Placeholder for algorithm components
│       └── main.ts          # Empty entry point
│
├── demo/                    # Demo HTML pages
│   ├── 1/index.html         # Sidebar + TOC demo
│   └── 2/index.html         # Slides demo
│
├── dist/                    # Build output (generated)
│   ├── doc_ui.es.js
│   ├── slides.es.js
│   └── wc.es.js
│
├── k8s/                     # Kubernetes manifests
│   ├── namespace/web-component.yaml
│   ├── wc-deployment.yaml
│   ├── wc-service.yaml
│   └── wc-ingress.yaml
│
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages deployment
│
├── vite.config.ts           # Vite build configuration
├── svelte.config.js         # Svelte compiler options
├── eslint.config.js         # ESLint flat config
├── tsconfig.json            # TypeScript configuration
├── docker-compose.yml       # Docker development services
├── Dockerfile               # Production nginx image
└── Dockerfile.build         # Build-only image (extract dist/)
```

## Build System

### Entry Points (vite.config.ts)

The library builds multiple entry points into ES modules:

```ts
build: {
  lib: {
    entry: {
      slides: resolve(__dirname, 'src/slides/main.ts'),
      doc_ui: resolve(__dirname, 'src/doc_ui/main.ts'),
      wc: resolve(__dirname, 'src/wc/main.ts')
    },
    formats: ['es'],
    fileName: (format, entryName) => `${entryName}.${format}.js`
  }
}
```

### Adding New Modules

1. Create `src/<module>/main.ts`
2. Import Svelte components with `customElement: true`
3. Add entry to `vite.config.ts` → `build.lib.entry`
4. Run `npm run build`

## Web Components

### Component Pattern

All Svelte components use `customElement: true` in `<svelte:options>`:

```svelte
<svelte:options customElement={{ tag: 'my-component', shadow: 'open' }} />
```

Or simplified:
```svelte
<svelte:options customElement="my-component" />
```

### Available Components

| Component | Tag | Module | Description |
|-----------|-----|--------|-------------|
| Sidebar | `<sidebar-component>` | doc_ui | Sliding sidebar with slot for content |
| TableOfContents | `<table-of-contents>` | doc_ui | Auto-generates TOC from h1-h6 headings |
| HeadingIdInjector | `<heading-id-injector>` | doc_ui | Assigns IDs to headings without IDs |
| SlidesComponent | `<slides-component>` | slides | Main slide container |
| SlidesUI | `<slides-ui>` | slides | Navigation buttons (←/→) |
| SlidesEnv | `<slides-env>` | slides | Auto-wraps h2s into slides |
| TableOfSlides | `<table-of-slides>` | slides | Navigation for slides (h2-based) |
| HelloWorld | `<hello-world>` | wc | Demo component with `name` prop |

### Usage Example

```html
<script type="module" src="https://posetmage.com/wc/doc_ui.es.js"></script>

<sidebar-component>
  <table-of-contents></table-of-contents>
</sidebar-component>

<heading-id-injector>
  <main>
    <h1>Title</h1>
    <h2>Section</h2>
    <p>Content...</p>
  </main>
</heading-id-injector>
```

## Slide System Architecture

The slides module creates a presentation mode:

1. **slides-component**: Root container, calls `initializeSlides()` on mount
2. **slides-env**: Auto-wraps each `<h2>` and its following content into `.slide` divs
3. **slide.store.ts**: Svelte store managing:
   - `currentSlideIndex`: Active slide number
   - `slideIds`: Array of slide IDs (from h2 elements)
   - `goToSlide()`, `nextSlide()`, `prevSlide()`: Navigation functions
4. **slides-ui**: Arrow key handlers and nav buttons
5. **table-of-slides**: Sidebar navigation listing all h2 headings

Hash-based navigation (`#slide-id`) syncs URL with current slide.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build ES modules to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Format (Prettier) + lint (ESLint) |
| `npm run check` | Svelte type checking |
| `npm run test` | Run Vitest tests |

## Docker Workflows

### Development
```bash
docker-compose up dev -d
docker-compose exec dev bash
npm run build
```

### Build Only (extract dist/)
```bash
docker build -f Dockerfile.build --target export --output dist .
```

### Production Image (nginx)
```bash
docker build -t wc .
docker run -p 8080:80 wc
```

## CI/CD

### GitHub Actions (.github/workflows/deploy.yml)

On push to `main`:
1. Checkout code
2. Build using `Dockerfile.build` with buildx caching
3. Upload `dist/` as artifact
4. Deploy to GitHub Pages

## Kubernetes Deployment

Manifests in `k8s/`:
- **Namespace**: `web-component`
- **Deployment**: Runs nginx with `dist/` mounted
- **Service**: NodePort on 30000
- **Ingress**: HTTPS at `wc.posetmage.com` with CORS enabled

**Note**: `wc-deployment.yaml` requires editing `<pwd-of-dist>` and `<pwd-of-demo>` paths.

## Key Design Decisions

1. **Shadow DOM**: All components use `shadow: 'open'` for style encapsulation
2. **No SvelteKit routing**: This is a library build, not an app
3. **ES modules only**: Output is `*.es.js` for modern browsers
4. **Auto-ID injection**: `heading-id-injector` adds IDs to headings for TOC linking
5. **Hash-based slide navigation**: URL hash syncs with active slide

## Common Tasks

### Add a New Web Component

1. Create `src/<module>/<ComponentName>.svelte`:
   ```svelte
   <svelte:options customElement="component-name" />
   <script lang="ts">
     export let prop: string = 'default';
   </script>
   <div>{prop}</div>
   ```

2. Import in the module's `main.ts`:
   ```ts
   import './<ComponentName>.svelte';
   ```

3. Build: `npm run build`

### Modify Build Outputs

Edit `vite.config.ts` → `build.lib.entry` to add/remove modules.

### Test Locally

1. `npm run build`
2. Open `demo/1/index.html` or `demo/2/index.html` in browser
3. Change script src to local path: `src="../../dist/doc_ui.es.js"`

## File Dependencies

```
slides.es.js
└── slides-component.svelte
    ├── slide.store.ts
    ├── slides-ui.svelte
    ├── slides-env.svelte
    ├── table-of-slides.svelte
    └── sidebar.svelte (from doc_ui)

doc_ui.es.js
├── sidebar.svelte
├── table-of-contents.svelte
└── heading-id-injector.svelte

wc.es.js
└── HelloWorld.svelte
```

## Gotchas

1. **Svelte 5 runes**: This repo uses Svelte 5 but components still use `export let` props (Svelte 4 style works)
2. **Cross-module imports**: `slides-component.svelte` imports `sidebar.svelte` from `doc_ui` - both modules register the same component
3. **Browser-only**: Components use `document.querySelectorAll` - SSR not supported
4. **h2 = slide boundary**: The slides system treats each `<h2>` as a new slide delimiter
