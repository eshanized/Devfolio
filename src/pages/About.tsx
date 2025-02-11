import { motion } from 'framer-motion';
import { settings } from '../settings';
import { AnimatedText } from '../components/AnimatedText';
import {
  Code2, Calendar, Building2, GraduationCap, Briefcase, ChevronRight,
  Heart, Lightbulb, Trophy, Target, Star, Book, Rocket, Award, User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export function About() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingIconVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const getTranslatedWorkContent = (work: typeof settings.about.workExperience[0]) => {
    const position = work.position === 'Senior Software Engineer' 
      ? t('about.positions.senior')
      : t('about.positions.software');
    
    const company = work.company === 'Meta'
      ? t('about.companies.meta')
      : t('about.companies.facebook');
    
    const descriptions = work.company === 'Meta'
      ? t('about.workDescriptions.meta', { returnObjects: true })
      : t('about.workDescriptions.facebook', { returnObjects: true });

    return { position, company, descriptions };
  };

  const getTranslatedEducation = (edu: typeof settings.about.education[0]) => {
    const degree = edu.degree.includes('Master')
      ? t('about.degrees.masters')
      : t('about.degrees.bachelors');
    
    const institution = edu.institution === 'Stanford University'
      ? t('about.universities.stanford')
      : t('about.universities.mit');
    
    const description = edu.degree.includes('Master')
      ? t('about.eduDescriptions.masters')
      : t('about.eduDescriptions.bachelors');

    return { degree, institution, description };
  };

  return (
    <div className={`min-h-screen transition-colors relative overflow-hidden ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      {/* Decorative Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-20 left-10">
          <motion.div variants={floatingIconVariants} initial="initial" animate="animate">
            <Code2 className="w-8 h-8 md:w-12 md:h-12 text-blue-500 opacity-20" />
          </motion.div>
        </div>
        <div className="absolute top-40 right-20">
          <motion.div variants={floatingIconVariants} initial="initial" animate="animate">
            <Heart className="w-6 h-6 md:w-10 md:h-10 text-red-500 opacity-20" />
          </motion.div>
        </div>
        <div className="absolute bottom-40 left-20">
          <motion.div variants={floatingIconVariants} initial="initial" animate="animate">
            <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 opacity-20" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10">
          <motion.div variants={floatingIconVariants} initial="initial" animate="animate">
            <Rocket className="w-8 h-8 md:w-14 md:h-14 text-purple-500 opacity-20" />
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-12 text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}
            >
              <User className={`w-8 h-8 md:w-10 md:h-10 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </motion.div>
            <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>{t('about.title')}</h1>
            <div className={`w-16 md:w-24 h-1 mx-auto rounded-full mb-6 md:mb-8 ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
            }`} />
          </motion.div>

          {/* Introduction Section */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl p-6 md:p-8 mb-6 md:mb-12 backdrop-blur-sm relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'bg-white/70 shadow-xl'
            }`}
          >
            <div className="absolute -right-8 -top-8 opacity-5">
              <Lightbulb className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-4 md:mb-6 flex items-center gap-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <Book className="w-6 h-6 md:w-8 md:h-8" />
              Introduction
            </h2>
            <AnimatedText
              text={t('about.introduction')}
              className={`text-base md:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            />
          </motion.div>

          {/* Motivation Section */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl p-6 md:p-8 mb-6 md:mb-12 backdrop-blur-sm relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'bg-white/70 shadow-xl'
            }`}
          >
            <div className="absolute -right-8 -top-8 opacity-5">
              <Target className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-4 md:mb-6 flex items-center gap-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <Trophy className="w-6 h-6 md:w-8 md:h-8" />
              {t('about.whatDrives')}
            </h2>
            <AnimatedText
              text={t('about.motivation')}
              className={`text-base md:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            />
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl p-6 md:p-8 mb-6 md:mb-12 backdrop-blur-sm relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'bg-white/70 shadow-xl'
            }`}
          >
            <div className="absolute -right-8 -top-8 opacity-5">
              <Briefcase className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-6 md:mb-8 flex items-center gap-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <Award className="w-6 h-6 md:w-8 md:h-8" />
              {t('about.workExperience')}
            </h2>
            <div className="space-y-8 md:space-y-12">
              {settings.about.workExperience.map((work, index) => {
                const { position, company, descriptions } = getTranslatedWorkContent(work);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className={`relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${
                      theme === 'dark'
                        ? 'before:bg-blue-500'
                        : 'before:bg-blue-600'
                    } before:rounded-full`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4 mb-3 md:mb-4">
                      <div>
                        <h3 className={`text-xl md:text-2xl font-semibold ${
                          theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                        }`}>{position}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className={`w-4 h-4 md:w-5 md:h-5 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`} />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {t('about.company')}: {company}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700/50 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{t('about.period')}: {work.period}</span>
                      </motion.div>
                    </div>
                    <ul className={`space-y-2 md:space-y-3 mb-4 md:mb-6 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {descriptions.map((desc: string, idx: number) => (
                        <motion.li
                          key={idx}
                          whileHover={{ x: 5 }}
                          className="flex items-start gap-2"
                        >
                          <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0 ${
                            theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                          }`} />
                          <span className="text-sm md:text-base">{desc}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {work.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          className={`inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
                            theme === 'dark'
                              ? 'bg-gray-700/50 text-blue-300'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          <Code2 className="w-3 h-3 md:w-4 md:h-4" />
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-800/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'bg-white/70 shadow-xl'
            }`}
          >
            <div className="absolute -right-8 -top-8 opacity-5">
              <GraduationCap className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-6 md:mb-8 flex items-center gap-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <Book className="w-6 h-6 md:w-8 md:h-8" />
              {t('about.education')}
            </h2>
            <div className="space-y-6 md:space-y-8">
              {settings.about.education.map((edu, index) => {
                const { degree, institution, description } = getTranslatedEducation(edu);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className={`relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${
                      theme === 'dark'
                        ? 'before:bg-blue-500'
                        : 'before:bg-blue-600'
                    } before:rounded-full`}
                  >
                    <h3 className={`text-lg md:text-2xl font-semibold ${
                      theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                    }`}>{degree}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Building2 className={`w-4 h-4 md:w-5 md:h-5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm md:text-base ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('about.institution')}: {institution}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs md:text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700/50 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t('about.year')}: {edu.year}</span>
                    </motion.div>
                    <p className={`mt-3 text-sm md:text-base ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>{description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}