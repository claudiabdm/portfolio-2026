import type { Page, PagesTranslation } from "@lib/directus/types";
import type { IconName } from "./icon-names";
import type { Language } from "@i18n/ui";

export type PageByLang = Record<Language,
    Pick<Page, 'name'> &
    Omit<PagesTranslation, 'id'> &
    { id: string, lang: Language, icon_name: IconName, blocks: any[] }
>