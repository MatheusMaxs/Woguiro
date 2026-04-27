import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from '@/locales/de/common.json';
import en from '@/locales/en/common.json';
import es from '@/locales/es/common.json';
import fr from '@/locales/fr/common.json';
import it from '@/locales/it/common.json';
import pt from '@/locales/pt/common.json';
import ru from '@/locales/ru/common.json';

const resources = {
  de: { translation: de },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  pt: { translation: pt },
  ru: { translation: ru },
} as const;

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
});

document.documentElement.lang = initialLanguage;

export default i18n;
