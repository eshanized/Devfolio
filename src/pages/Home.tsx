import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, MapPin, Users, Link as LinkIcon, Mail, ExternalLink } from 'lucide-react';
import { AnimatedText } from '../components/AnimatedText';
import { settings } from '../settings';
import { useEffect, useState } from 'react';
import { fetchGithubProfile } from '../lib/github';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface GithubProfile {
  avatar_url: string;
  bio: string;
  blog: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  name: string;
  company: string;
}

const gradientStyles = {
  textGradientBlue: {
    backgroundImage: 'linear-gradient(to right, #60A5FA, #818CF8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  textGradientDark: {
    backgroundImage: 'linear-gradient(to right, #1E40AF, #3B82F6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
};

export function Home() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    fetchGithubProfile(settings.githubUsername).then(setProfile);
  }, []);

  const stats = [
    { label: t('stats.repositories'), value: profile?.public_repos ?? 0, icon: Github },
    { label: t('stats.followers'), value: profile?.followers ?? 0, icon: Users },
    { label: t('stats.following'), value: profile?.following ?? 0, icon: Users },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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

  const glowVariants = {
    initial: { opacity: 0.5, scale: 0.8 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'}`}>
      
      {/* Background Decorative Elements */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20
          ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'}`}
      />
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20
          ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'}`}
      />

      <div className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center min-h-[80vh] gap-8 relative z-10"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            {profile?.avatar_url && (
              <div className="relative">
                <img
                  src={profile.avatar_url}
                  alt={t('name')}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{
                    boxShadow: theme === 'dark' 
                      ? '0 0 25px rgba(59, 130, 246, 0.5)' 
                      : '0 0 25px rgba(59, 130, 246, 0.3)'
                  }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            )}
            <motion.div
              className={`absolute -bottom-2 -right-2 p-3 rounded-full
                ${theme === 'dark' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-500 shadow-lg'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* Name and Role */}
          <motion.div variants={itemVariants} className="text-center">
            <AnimatedText
              text={t('name')}
              className="text-4xl md:text-6xl font-bold mb-4"
              style={theme === 'dark' ? gradientStyles.textGradientBlue : gradientStyles.textGradientDark}
            />
            <AnimatedText
              text={t('role')}
              className={`text-xl md:text-2xl mb-4 ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}
            />
            {profile?.bio && (
              <AnimatedText
                text={profile.bio}
                className={`text-base md:text-lg max-w-2xl mx-auto px-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              />
            )}
          </motion.div>

          {/* Location and Company */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm md:text-base ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-white shadow-md text-gray-600'
              }`}
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              <span>{t('location')}</span>
            </motion.div>
            {profile?.company && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm md:text-base ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-white shadow-md text-gray-600'
                }`}
              >
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                <span>{profile.company}</span>
              </motion.div>
            )}
            {profile?.blog && (
              <motion.a
                href={profile.blog}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white shadow-md text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LinkIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
              </motion.a>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 w-full max-w-3xl px-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className={`relative overflow-hidden rounded-xl p-4 md:p-6 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 backdrop-blur-sm'
                    : 'bg-white/70 shadow-lg backdrop-blur-sm'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="relative z-10"
                >
                  <stat.icon className={`w-5 h-5 md:w-6 md:h-6 mb-2 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                  <div className={`text-2xl md:text-3xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {stat.label}
                  </div>
                </motion.div>
                <div className={`absolute inset-0 opacity-5 ${
                  theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
                }`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 md:gap-6"
          >
            {settings.socialMedia.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 md:p-3 rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                    : 'bg-white shadow-lg text-gray-600 hover:text-blue-600'
                }`}
              >
                {social.platform === 'Twitter' && <Twitter className="w-5 h-5 md:w-6 md:h-6" />}
                {social.platform === 'LinkedIn' && <Linkedin className="w-5 h-5 md:w-6 md:h-6" />}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${t('email')}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 md:p-3 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                  : 'bg-white shadow-lg text-gray-600 hover:text-blue-600'
              }`}
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}