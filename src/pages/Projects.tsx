import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  Github, 
  Calendar,
  Code2,
  Eye,
  MessageCircle,
  GitBranch,
  Search
} from 'lucide-react';
import { settings } from '../settings';
import { fetchGithubRepos } from '../lib/github';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  open_issues_count: number;
}

export function Projects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    fetchGithubRepos(settings.githubUsername).then(setRepos);
  }, []);

  const languages = Array.from(new Set(repos.map(repo => repo.language).filter(Boolean)));

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen py-20 transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={`text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>{t('projects.title')}</h1>
            <div className={`w-24 h-1 mx-auto rounded-full mb-8 ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
            }`} />
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className={`relative flex-1 max-w-md ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type="text"
                placeholder={t('projects.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 focus:bg-gray-700/50 text-white'
                    : 'bg-white focus:bg-gray-50 text-gray-900'
                }`}
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => setSelectedLanguage('')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedLanguage === ''
                    ? theme === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('projects.allProjects')}
              </button>
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedLanguage === lang
                      ? theme === 'dark'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredRepos.map((repo) => (
              <motion.div
                key={repo.id}
                variants={item}
                whileHover={{ y: -5 }}
                className={`rounded-2xl overflow-hidden backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'bg-white/70 shadow-xl'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.h3
                      whileHover={{ x: 5 }}
                      className={`text-xl font-semibold ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-2"
                      >
                        <Github className="w-5 h-5" />
                        {repo.name}
                      </a>
                    </motion.h3>
                    {repo.homepage && (
                      <motion.a
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-colors ${
                          theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>

                  <p className={`mb-4 h-20 overflow-hidden ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {repo.description || 'No description available'}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map(topic => (
                        <span
                          key={topic}
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === 'dark'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={`flex items-center gap-4 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <Code2 className="w-4 h-4" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {repo.watchers_count}
                    </span>
                  </div>

                  <div className={`mt-4 pt-4 border-t ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`flex items-center gap-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        {t('projects.updated')}: {formatDate(repo.updated_at)}
                      </span>
                      {repo.open_issues_count > 0 && (
                        <span className={`flex items-center gap-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <MessageCircle className="w-4 h-4" />
                          {t('projects.issues')}: {repo.open_issues_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredRepos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <GitBranch className={`w-16 h-16 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t('projects.noProjects')}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}