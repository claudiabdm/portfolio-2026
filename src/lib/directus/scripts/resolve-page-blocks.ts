import { readItem, type RegularCollections } from "@directus/sdk";
import { defaultLang, type Language } from "@i18n/ui";
import { getLangFromCode } from "@i18n/utils";
import directus from "@lib/directus";
import type { Page, Schema } from "@lib/directus/types";
import type { PageByLang } from "@lib/types";

export async function resolvePageBlocks(
    blocks: Page['blocks'],
    pageByLang: PageByLang
) {
    const blockParentByLang = Object.keys(pageByLang).reduce((acc, lang) => {
        acc[lang] = { blockParent: null }
        return acc
    }, {} as Record<Language, { blockParent: { id: string, collection: string, blocks: any[] } | null }>)

    const queue = blocks ?? [];

    while (queue.length > 0) {
        const block = queue.shift()

        if (typeof block === 'string'
            || block == null
            || block.collection == null
            || typeof block.item !== 'string'
        ) {
            continue
        }

        let resolvedItem: any = await directus.request(
            readItem(block.collection as RegularCollections<Schema>, block.item, {
                "fields": [
                    "*",
                    //@ts-expect-error
                    "blocks.*",
                    //@ts-expect-error
                    "translations.*",
                ],
            }))

        const { translations, ...item } = resolvedItem
        const resolvedBlock = { ...block, ...item }

        const blockTranslations = translations?.reduce((acc: any, t: any) => {
            const lang = getLangFromCode(t.languages_code)
            if (lang == null) return acc
            acc[lang] = t
            return acc
        }, {})

        // Put blocks into corresponding language
        for (const lang in pageByLang) {
            const translation = blockTranslations?.[lang] ?? blockTranslations?.[defaultLang]
            const translatedBlock = { ...resolvedBlock, ...(translation ?? []) }

            const hasParent = _hasParent(translatedBlock, blockParentByLang[lang].blockParent)
            if (hasParent) {
                blockParentByLang[lang].blockParent!.blocks.push(translatedBlock)
            } else {
                pageByLang[lang].blocks.push(translatedBlock)
            }

            if ('blocks' in translatedBlock && Array.isArray(translatedBlock.blocks)) {
                translatedBlock.blocks = [];
                blockParentByLang[lang].blockParent = translatedBlock
            }
        }

        // Updates queue
        if ('blocks' in resolvedBlock && Array.isArray(resolvedBlock.blocks)) {
            queue.push(...resolvedBlock.blocks)
        }
    }
}

function _hasParent(block: { [key: `${string}_id`]: string }, parent?: { id: string, collection: string } | null): boolean {
    if (parent == null) return false
    return parent && block[`${parent.collection}_id`] === parent.id
}