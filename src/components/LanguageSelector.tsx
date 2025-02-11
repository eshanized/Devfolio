import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { settings } from '../settings';
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: { [key: string]: Language } = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: 'https://flagcdn.com/w40/gb.png'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: 'https://flagcdn.com/w40/in.png'
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: 'https://flagcdn.com/w40/bd.png'
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: 'https://flagcdn.com/w40/lk.png'
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: 'https://flagcdn.com/w40/in.png'
  }
};

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // If translations are disabled, don't render the component
  if (!settings.features.enableTranslation) {
    return null;
  }

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages[i18n.language as keyof typeof languages];
  
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-colors flex items-center gap-2 ${
          theme === 'dark'
            ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
      >
        {currentLanguage && (
          <>
            <img
              src={currentLanguage.flag}
              alt={currentLanguage.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="hidden md:inline text-sm font-medium">
              {currentLanguage.name}
            </span>
          </>
        )}
        <Languages className="w-5 h-5" />
      </motion.button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg z-50 ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          {settings.features.availableLanguages.map((langCode) => {
            const lang = languages[langCode as keyof typeof languages];
            if (!lang) return null;
            
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-3 ${
                  i18n.language === lang.code
                    ? theme === 'dark'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="flex flex-col">
                  <span className="text-sm">{lang.name}</span>
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {lang.nativeName}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}