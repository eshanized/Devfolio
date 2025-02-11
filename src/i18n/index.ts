import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations';
import { settings } from '../settings';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: translations,
    fallbackLng: settings.features.defaultLanguage,
    lng: settings.features.defaultLanguage, // Force default language if translations are disabled
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    // Disable language detection if translations are disabled
    load: settings.features.enableTranslation ? 'languageOnly' : 'currentOnly',
  });

export default i18n;