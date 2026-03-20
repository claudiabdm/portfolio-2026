import { defaultLang } from "@i18n/ui";
import type { Page, Language as DirectusLanguage, Config } from "../types";
import { getLangFromCode } from "@i18n/utils";
import type { PageByLang } from "@lib/types";

export function groupPageByLang(page: Page, languages: DirectusLanguage[], config: Config) {
    const defaultTranslation = page.translations?.find(t => getLangFromCode(t.languages_code) === defaultLang)

    const pageByLang = languages.reduce((acc, l) => {
        const lang = getLangFromCode(l.code);

        if (lang == null) {
            return acc
        }

        const translation = page.translations?.find(t => getLangFromCode(t.languages_code) === lang) ?? defaultTranslation

        if (translation == null) {
            return acc
        }

        const isIndexPage = page.id === config.index_page;

        let slug;

        if (isIndexPage) {
            slug = lang === defaultLang ? '/' : `/${lang}`
        } else {
            slug = lang === defaultLang ? `/${translation.slug}` : `/${lang}/${translation.slug}`
        }

        const { translations, ...rest } = page

        acc[lang] = {
            ...translation,
            ...rest,
            id: `${page.id}-${lang}`,
            slug,
            lang,
            blocks: [],
        }
        return acc
    }, {} as PageByLang);

    return pageByLang;
}