import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { settings } from '../settings';
import { fetchGithubLanguages } from '../lib/github';
import {
  Code2, 
  Braces, 
  Library, 
  Database,
  Terminal,
  Globe,
  Cpu,
  Server,
  Layers,
  Box,
  Workflow,
  GitBranch,
  Cloud
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export function Skills() {
  const [githubLanguages, setGithubLanguages] = useState<string[]>([]);
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    fetchGithubLanguages(settings.githubUsername).then(setGithubLanguages);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getSkillIcon = (skill: string) => {
    const icons: { [key: string]: any } = {
      JavaScript: Braces,
      TypeScript: Code2,
      Python: Terminal,
      Java: Cpu,
      React: Globe,
      'Node.js': Server,
      Express: Box,
      'Next.js': Layers,
      Git: GitBranch,
      Docker: Workflow,
      AWS: Cloud,
      MongoDB: Database,
      default: Library
    };
    
    const IconComponent = icons[skill] || icons.default;
    return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />;
  };

  return (
    <div className={`min-h-screen py-12 sm:py-20 transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className={`text-3xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>{t('skills.title')}</h1>
            <div className={`w-24 h-1 mx-auto rounded-full ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
            }`} />
            <p className={`mt-4 text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>{t('skills.subtitle')}</p>
          </motion.div>

          <div className="grid gap-4 sm:gap-8">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={`rounded-2xl p-4 sm:p-8 backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'bg-white/70 shadow-xl'
              }`}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <Terminal className={`w-6 h-6 sm:w-8 sm:h-8 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h2 className={`text-xl sm:text-2xl font-semibold ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>{t('skills.languages')}</h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {settings.skills.languages.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700/50 hover:bg-gray-700'
                        : 'bg-blue-50 hover:bg-blue-100'
                    }`}
                  >
                    <motion.div
                      variants={floatingAnimation}
                      initial="initial"
                      animate="animate"
                      className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                    >
                      {getSkillIcon(skill)}
                    </motion.div>
                    <span className={`text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                    }`}>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={`rounded-2xl p-4 sm:p-8 backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'bg-white/70 shadow-xl'
              }`}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <Library className={`w-6 h-6 sm:w-8 sm:h-8 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`} />
                <h2 className={`text-xl sm:text-2xl font-semibold ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>{t('skills.frameworks')}</h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {settings.skills.frameworks.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700/50 hover:bg-gray-700'
                        : 'bg-green-50 hover:bg-green-100'
                    }`}
                  >
                    <motion.div
                      variants={floatingAnimation}
                      initial="initial"
                      animate="animate"
                      className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}
                    >
                      {getSkillIcon(skill)}
                    </motion.div>
                    <span className={`text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-green-300' : 'text-green-700'
                    }`}>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={`rounded-2xl p-4 sm:p-8 backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'bg-white/70 shadow-xl'
              }`}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <GitBranch className={`w-6 h-6 sm:w-8 sm:h-8 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <h2 className={`text-xl sm:text-2xl font-semibold ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`}>{t('skills.githubLanguages')}</h2>
              </motion.div>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {githubLanguages.length > 0 ? (
                  githubLanguages.map((language, index) => (
                    <motion.div
                      key={language}
                      variants={item}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700/50 hover:bg-gray-700'
                          : 'bg-purple-50 hover:bg-purple-100'
                      }`}
                    >
                      <motion.div
                        variants={floatingAnimation}
                        initial="initial"
                        animate="animate"
                        className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
                      >
                        {getSkillIcon(language)}
                      </motion.div>
                      <span className={`text-sm sm:text-base font-medium ${
                        theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                      }`}>{language}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className={`col-span-full text-center py-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{t('skills.noLanguages')}</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}