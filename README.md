# Svetle 5 Web Component Template

A starter repository for building and deploying custom web components with Vite. This template supports multiple modules—such as documentation UI, slides, and core web components—configurable via `vite.config.ts`, and is automatically built and deployed via GitHub Actions.

## Getting Started

### Configuration

Open `vite.config.ts` and locate the `build.rollupOptions.input` section. Add, remove, or rename modules as needed:

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        slides: resolve(__dirname, 'src/slides/main.ts'),
        doc_ui: resolve(__dirname, 'src/doc_ui/main.ts'),
        wc: resolve(__dirname, 'src/wc/main.ts'),
        // Add your own modules here
      }
    }
  }
});
```

After running `npm run build`, each module will be output as an ES module:

* `slides.es.js`
* `doc_ui.es.js`
* `wc.es.js`

These are served from your deployment domain (e.g., `https://posetmage.com/wc/<module>.es.js`).

---

### Usage Examples

#### 1. Document UI (Auto TOC Sidebar)

Embed the documentation UI component to automatically generate a table of contents sidebar:

```html
<script type="module" src="https://posetmage.com/wc/doc_ui.es.js"></script>

<sidebar-component>
  <table-of-contents></table-of-contents>
</sidebar-component>

<heading-id-injector>
  {{ content }}
</heading-id-injector>
```

#### 2. Slides Mode

Transform your Markdown content into a slide deck, with sidebar navigation:

but this need slide syntax, please see **[Example Slides Content](https://raw.githubusercontent.com/HomunMage/Content/main/Slides/2025/JSDC/index.md)** or **[Example Slides Page](https://homun.posetmage.com/Content/Slides/2025/JSDC/)**

```html
<script type="module" src="https://posetmage.com/wc/slides.es.js"></script>
<script type="module" src="https://posetmage.com/wc/doc_ui.es.js"></script>

<slides-component></slides-component>

<sidebar-component>
  <table-of-slides></table-of-slides>
</sidebar-component>

<heading-id-injector>
  {{ content }}
</heading-id-injector>
```


---

## Deployment and Development

This repo auto trigger GitHub Actions workflow (`.github/workflows/deploy.yml`) to build and deploy with github-page.

### Self-Hosting Deployment (Kubernetes)

This template includes a `k8s/` directory with sample manifests for running your web components by a Kubernetes.
(need modify `wc-deployment.yaml`)

## Dev with Docker Compose

If you dont want to dev with node env, I'll recommand you docker,

1. Start the dev container, Enter the container shell
   From the project root:

   ```bash
   docker-compose up dev -d
   docker-compose exec dev bash
   ```
2. Build your modules
   in the termianl
   ```bash
   npm run build
   ```

   This outputs your ES modules into `dist/` folder


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
