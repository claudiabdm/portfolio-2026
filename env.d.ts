/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/pwa-assets" />

interface ImportMetaEnv {
    readonly DIRECTUS_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}