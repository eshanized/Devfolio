import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Briefcase, Sun, Moon, Mail, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { settings } from '../settings';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

export function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const links = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/about', icon: User, label: t('nav.about') },
    { to: '/skills', icon: Code2, label: t('nav.skills') },
    { to: '/projects', icon: Briefcase, label: t('nav.projects') },
    ...(settings.devToUsername ? [{ to: '/articles', icon: FileText, label: t('nav.articles') }] : []),
    { to: '/contact', icon: Mail, label: t('nav.contact') },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2 hidden md:block">
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className={`
            px-6 py-3 rounded-full
            ${theme === 'dark' 
              ? 'bg-gray-900/80 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
              : 'bg-white/80 shadow-lg'}
            backdrop-blur-lg
            border border-gray-700/20
          `}
        >
          <div className="flex items-center gap-6">
            <motion.ul 
              variants={navVariants}
              className="flex items-center gap-4"
            >
              {links.map(({ to, icon: Icon, label }) => (
                <motion.li
                  key={to}
                  variants={linkVariants}
                  className="relative"
                >
                  <Link
                    to={to}
                    className="relative block p-2 group"
                    onMouseEnter={() => setHoveredLink(to)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          location.pathname === to
                            ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            : theme === 'dark' ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'
                        }`}
                      />
                    </motion.div>
                    
                    <AnimatePresence>
                      {hoveredLink === to && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.8 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                          className={`
                            absolute left-1/2 -bottom-8 -translate-x-1/2 
                            px-2 py-1 rounded text-xs whitespace-nowrap
                            ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 shadow-md'}
                          `}
                        >
                          {label}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {location.pathname === to && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        }`}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex items-center gap-2">
              <LanguageSelector />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`
                  p-2 rounded-full transition-colors
                  ${theme === 'dark'
                    ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'}
                `}
              >
                <motion.div
                  initial={false}
                  animate={{ 
                    rotate: theme === 'dark' ? 0 : 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <nav className={`
          px-4 py-3
          ${theme === 'dark' 
            ? 'bg-gray-900/95 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
            : 'bg-white/95 shadow-lg'}
          backdrop-blur-lg
        `}>
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="text-xl font-bold">
                {t('name').split(' ')[0]}
              </Link>
            </motion.div>

            <div className="flex items-center gap-2">
              <LanguageSelector />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`
                  p-2 rounded-full transition-colors
                  ${theme === 'dark'
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'}
                `}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  p-2 rounded-full transition-colors
                  ${theme === 'dark'
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'}
                `}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'menu'}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`
                overflow-hidden
                ${theme === 'dark' 
                  ? 'bg-gray-900/95 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                  : 'bg-white/95 shadow-lg'}
                backdrop-blur-lg
              `}
            >
              <ul className="px-4 py-2">
                {links.map(({ to, icon: Icon, label }) => (
                  <motion.li
                    key={to}
                    variants={mobileItemVariants}
                  >
                    <Link
                      to={to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg my-1
                        transition-colors
                        ${location.pathname === to
                          ? theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-50 text-blue-600'
                          : theme === 'dark'
                          ? 'text-gray-400 hover:bg-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <span>{label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}