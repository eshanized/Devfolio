import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Heart, Code2, FileJson, FileType, File as FileHtml, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageStats {
  name: string;
  lines: number;
  icon: React.ElementType;
  color: string;
}

export function Footer() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const [stats] = useState<LanguageStats[]>([
    { 
      name: t('footer.languages.TypeScript'),
      lines: 2150,
      icon: FileType,
      color: theme === 'dark' ? '#3178C6' : '#235A97'
    },
    { 
      name: t('footer.languages.JavaScript'),
      lines: 180,
      icon: FileJson,
      color: theme === 'dark' ? '#F7DF1E' : '#C9B306'
    },
    { 
      name: t('footer.languages.CSS'),
      lines: 120,
      icon: Palette,
      color: theme === 'dark' ? '#38BDF8' : '#2563EB'
    },
    { 
      name: t('footer.languages.HTML'),
      lines: 90,
      icon: FileHtml,
      color: theme === 'dark' ? '#E34F26' : '#C4432D'
    }
  ]);

  const totalLines = stats.reduce((acc, curr) => acc + curr.lines, 0);

  return (
    <footer className={`w-full py-6 text-center ${
      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
    }`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Language Stats */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Code2 className={`w-4 h-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <span className="text-sm font-medium">
                {totalLines.toLocaleString()} lines of code
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {stats.map(({ name, lines, icon: Icon, color }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800/80 text-gray-300'
                      : 'bg-gray-100/80 text-gray-700'
                  }`}
                  style={{
                    boxShadow: theme === 'dark' 
                      ? `0 0 10px ${color}20`
                      : `0 2px 4px ${color}10`
                  }}
                >
                  <Icon 
                    className="w-3.5 h-3.5" 
                    style={{ color }}
                  />
                  <span className="font-medium">{name}</span>
                  <span className={
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }>{lines.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm select-none"
          >
            © {year} Made with{' '}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                color: theme === 'dark' ? ['#f43f5e', '#ec4899', '#f43f5e'] : ['#e11d48', '#db2777', '#e11d48']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block"
            >
              <Heart className="w-4 h-4 inline-block -mt-1" />
            </motion.span>
            {' '}by{' '}
            <motion.a
              href="https://github.com/eshanized"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              eshanized
            </motion.a>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}