import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from '@/locales/ar/common.json';
import de from '@/locales/de/common.json';
import en from '@/locales/en/common.json';
import es from '@/locales/es/common.json';
import fr from '@/locales/fr/common.json';
import it from '@/locales/it/common.json';
import pt from '@/locales/pt/common.json';
import ru from '@/locales/ru/common.json';
import { sharedTranslations } from '@/locales/sharedTranslations';

type TranslationTree = Record<string, unknown>;

function mergeTranslations<T extends TranslationTree>(base: T, additions: TranslationTree): T {
  const merged: TranslationTree = { ...base };

  Object.entries(additions).forEach(([key, value]) => {
    const baseValue = merged[key];

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      merged[key] = mergeTranslations(baseValue as TranslationTree, value as TranslationTree);
      return;
    }

    merged[key] = value;
  });

  return merged as T;
}

const resources = {
  ar: { translation: mergeTranslations(ar, sharedTranslations.ar) },
  de: { translation: mergeTranslations(de, sharedTranslations.de) },
  en: { translation: mergeTranslations(en, sharedTranslations.en) },
  es: { translation: mergeTranslations(es, sharedTranslations.es) },
  fr: { translation: mergeTranslations(fr, sharedTranslations.fr) },
  it: { translation: mergeTranslations(it, sharedTranslations.it) },
  pt: { translation: mergeTranslations(pt, sharedTranslations.pt) },
  ru: { translation: mergeTranslations(ru, sharedTranslations.ru) },
} as const;

const rtlLanguages = new Set(['ar']);

const storedLanguage = window.localStorage.getItem('woguiro-language');
const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
const fallbackLanguage = 'en';
const initialLanguage =
  storedLanguage && storedLanguage in resources
    ? storedLanguage
    : browserLanguage in resources
      ? browserLanguage
      : fallbackLanguage;

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (language) => {
  window.localStorage.setItem('woguiro-language', language);
  document.documentElement.lang = language;
  document.documentElement.dir = rtlLanguages.has(language) ? 'rtl' : 'ltr';
});

document.documentElement.lang = initialLanguage;
document.documentElement.dir = rtlLanguages.has(initialLanguage) ? 'rtl' : 'ltr';

export default i18n;
