import { defaultLang, LANGUAGES, type Language } from './ui';
import type { Language as DirectusLanguage } from '@lib/directus/types';

export function getLangFromUrl(url: URL): Language {
    const [, lang] = url.pathname.split('/');
    if (LANGUAGES.includes(lang)) return lang as Language;
    return defaultLang;
}


export function getLangFromCode(languages_code?: DirectusLanguage | string | null) {
    if (languages_code == null) {
        return;
    }
    const code = typeof languages_code === "string" ? languages_code : languages_code?.code;
    return code?.split('-')[0]
}