// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `const version = new URLSearchParams(location.search).get('framewire');
              if (version){
                const localUrl = 'http://localhost:3202/framewire/index.mjs';
                const cdnUrl = \`https://static.parastorage.com/services/framewire/\${version}/index.mjs\`;
                const url = version === 'local' ? localUrl : cdnUrl;
                const framewireModule = await import(url);
                globalThis.framewire = framewireModule;
                framewireModule.init({}, import.meta.hot);
                console.log('Framewire initialized');
              }`
            );
          }
        },
      },
    },
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [
      customErrorOverlayPlugin(),
    ],
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
