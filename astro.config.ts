// @ts-check
import { defineConfig } from 'astro/config';
import { defaultLang, LANGUAGES } from './src/i18n/ui';
import { generateIconNames } from "vite-plugin-svg-sprite-names-typescript";
import AstroPWA from '@vite-pwa/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: "https://www.claudiabdm.com",
    devToolbar: {
        'enabled': false
    },
    build: {
        'inlineStylesheets': 'never',
    },
    i18n: {
        defaultLocale: defaultLang,
        locales: LANGUAGES,
    },
    markdown: {
        syntaxHighlight: false
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    loadPaths: [`${import.meta.dirname}/src`]
                }
            }
        },
        build: {
            assetsInlineLimit: 0,
        },
        plugins: [
            generateIconNames({
                svgFilePath: "./src/assets/sprite.svg",
                typesFilePath: "./src/lib/types/icon-names.ts",
                typeName: "IconName",
            }),
        ]
    },
    integrations: [
        AstroPWA({
            manifest: {
                name: 'claudiabdm',
                short_name: 'claudiabdm',
                theme_color: ' hsl(187, 55%, 60%)',
            },
            pwaAssets: {
                config: true
            }
        }),
        sitemap(
            {
                i18n: {
                    defaultLocale: "en",
                    locales: {
                        en: "en",
                        es: "es",
                    }
                }
            }
        )
    ],
    image: {
        domains: ["localhost"],
        remotePatterns: [{ protocol: "https" }],
    },
});