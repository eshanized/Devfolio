import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Heart } from 'lucide-react';

export function SponsorButton() {
  const { theme } = useTheme();

  return (
    <motion.a
      href="https://github.com/sponsors/eshanized"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-24 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${
        theme === 'dark'
          ? 'bg-pink-500 hover:bg-pink-600 text-white'
          : 'bg-pink-600 hover:bg-pink-700 text-white'
      }`}
    >
      <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
      <span className="font-medium">Sponsor</span>
    </motion.a>
  );
}