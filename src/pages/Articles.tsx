import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { settings } from '../settings';
import { Article, fetchDevToArticles } from '../lib/devto';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Clock,
  MessageCircle,
  Heart,
  Tag,
  BookOpen,
  Search,
  FileText,
  Newspaper,
  ArrowRight
} from 'lucide-react';

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (settings.devToUsername) {
      fetchDevToArticles(settings.devToUsername).then(setArticles);
    }
  }, []);

  const allTags = Array.from(
    new Set(articles.flatMap(article => article.tag_list))
  );

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || article.tag_list.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const getDefaultImage = (title: string) => {
    const hash = title.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const imageNumber = (hash % 5) + 1;
    
    const defaultImages = [
      'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1200',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200',
    ];

    return defaultImages[imageNumber - 1];
  };

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
            <div className="flex items-center justify-center gap-3 mb-4">
              <Newspaper className={`w-12 h-12 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h1 className={`text-5xl font-bold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>{t('articles.title')}</h1>
            </div>
            <div className={`w-24 h-1 mx-auto rounded-full mb-8 ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
            }`} />
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('articles.subtitle')}
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
                placeholder={t('articles.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 focus:bg-gray-700/50 text-white'
                    : 'bg-white focus:bg-gray-50 text-gray-900'
                }`}
              />
            </div>
            <div className="hidden md:flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTag === ''
                    ? theme === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('articles.allArticles')}
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTag === tag
                      ? theme === 'dark'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                variants={item}
                whileHover={{ y: -5 }}
                className={`group rounded-2xl overflow-hidden backdrop-blur-sm transform transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]'
                    : 'bg-white/70 hover:bg-white/90 shadow-xl hover:shadow-2xl'
                }`}
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={article.cover_image || getDefaultImage(article.title)}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className={`absolute inset-0 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent'
                      : 'bg-gradient-to-t from-black via-black/40 to-transparent'
                  }`} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        theme === 'dark'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {t('articles.readTime', { time: article.reading_time_minutes })}
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        theme === 'dark'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        <Calendar className="w-3 h-3" />
                        {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {article.title}
                  </h2>
                  <p className={`mb-4 line-clamp-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {article.description}
                  </p>

                  <div className="hidden md:flex flex-wrap gap-2 mb-4">
                    {article.tag_list.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors ${
                          theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {article.tag_list.length > 3 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{article.tag_list.length - 3}
                      </span>
                    )}
                  </div>

                  <div className={`flex items-center justify-between mb-4 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className={`w-4 h-4 ${
                          article.public_reactions_count > 0
                            ? 'text-pink-500'
                            : ''
                        }`} />
                        {article.public_reactions_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {article.comments_count}
                      </span>
                    </div>
                  </div>

                  <motion.a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="flex-1">{t('articles.readArticle')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className={`w-16 h-16 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t('articles.noArticles')}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}