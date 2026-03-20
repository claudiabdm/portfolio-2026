import { defineCollection, reference } from "astro:content";
import { z } from 'astro/zod'
import { readFiles, readItems, readSingleton, readTranslations } from "@directus/sdk";
import directus from "@lib/directus";
import type { Config, Page } from "@lib/directus/types";
import { groupPageByLang } from '@lib/directus/scripts/group-page-by-lang';
import { resolvePageBlocks } from '@lib/directus/scripts/resolve-page-blocks';
import type { PageByLang } from '@lib/types';
import { mkdir, writeFile } from 'node:fs/promises';


const Languages = defineCollection({
    async loader() {
        const languages = await directus.request(readItems("languages"))
        return languages.map((item) => ({ ...item, id: item.code, lang: item.code.split("-")[0] }))
    },
    schema: z.object({
        lang: z.string(),
        name: z.string(),
    })
})

const Translations = defineCollection({
    async loader() {
        const translation = await directus.request(readTranslations())
        const collection = translation.map(t => ({
            id: `${t.key}-${t.language.split("-")[0]}`,
            lang: t.language.split("-")[0],
            key: t.key,
            value: t.value,
        }))
        return collection
    },
    schema: z.object({
        id: z.string(),
        lang: z.string(),
        key: z.string(),
        value: z.string(),
    })
})


const Navbar = defineCollection({
    async loader() {
        const config = await directus.request(readSingleton("config", {
            backlink: true,
            fields: [
                {
                    navbar: [
                        {
                            pages_id: ["id"],
                        }
                    ]
                }
            ],
            sort: ['navbar']
        }))
        const navbar = (config.navbar ?? [])
            .filter((item) => item.pages_id != null)
            .map((item, i) => ({ id: item.pages_id!.id, sort: i }))
        return navbar
    },
    schema: z.object({
        id: reference("Pages"),
        sort: z.number()
    })
})

const basePageSchema = z.object({
    id: z.string(),
    lang: z.string(),
    slug: z.string(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    icon_name: z.string().nullable(),
    image: z.string().nullable(),
    with_margin_bottom: z.boolean().optional(),
    blocks: z.array(z.any().and(z.object({
        sort: z.number(),
        collection: z.string()
    }))),
})

export const pageSchema = z.union([
    basePageSchema.extend({
        name: z.literal("Projects"),
        total_count_text: z.string(),
    }),
    basePageSchema.extend({
        name: z.string(),
    }),
]);

const Pages = defineCollection({
    async loader() {

        const languages = await directus.request(readItems("languages"))

        const config = (await directus.request(readSingleton("config")))

        const pages = await directus.request(readItems('pages', {
            fields: [
                "*",
                // @ts-expect-error
                "translations.*",
                // @ts-expect-error
                "blocks.*",

            ]
        }))

        const collection: Array<PageByLang[keyof PageByLang]> = []

        for (const page of pages) {

            const pageByLang = groupPageByLang(page as Page, languages, config as Config)

            await resolvePageBlocks(page.blocks, pageByLang)

            for (const lang in pageByLang) {
                collection.push(pageByLang[lang])
            }
        }

        return collection
    },
    schema: pageSchema
})

const baseFileSchema = z.object({
    id: z.string(),
    filename_download: z.string(),
    description: z.string().nullable(),
})

export const fileSchema = z.union([
    baseFileSchema.extend({
        type: z.literal("application/pdf"),
    }),
    baseFileSchema.extend({
        type: z.string().startsWith("image/"),
        width: z.number(),
        height: z.number(),
    }),
    baseFileSchema.extend({
        type: z.string(),
    }),
]);

const Files = defineCollection({
    async loader() {
        const files = await directus.request(readFiles())
        await Promise.all([
            await mkdir('./src/assets/directus/', { recursive: true }),
            await mkdir('./public/directus/', { recursive: true })
        ])
        const collection = await Promise.all(files.map(
            async (file) => {
                const res = await fetch(`${import.meta.env.DIRECTUS_URL}/assets/${file.id}`)
                const buffer = await res.arrayBuffer()
                if (file.type?.startsWith('image/')) {
                    await writeFile(`./src/assets/directus/${file.filename_disk}`, Buffer.from(buffer))
                    file.filename_download = `/src/assets/directus/${file.filename_disk}`
                } else {
                    await writeFile(`./public/directus/${file.filename_disk}`, Buffer.from(buffer))
                    file.filename_download = `/directus/${file.filename_disk}`
                }
                return file
            }
        ))
        return collection
    },
    schema: fileSchema
})


export const collections = { Languages, Translations, Navbar, Pages, Files }