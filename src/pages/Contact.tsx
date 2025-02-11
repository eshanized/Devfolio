import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { settings } from '../settings';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function Contact() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = `${t('contact.form.name')} ${t('contact.form.validation.required')}`;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = `${t('contact.form.email')} ${t('contact.form.validation.required')}`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.validation.invalidEmail');
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = `${t('contact.form.subject')} ${t('contact.form.validation.required')}`;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = `${t('contact.form.message')} ${t('contact.form.validation.required')}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitStatus('loading');

    try {
      await emailjs.sendForm(
        settings.emailjs.serviceId,
        settings.emailjs.templateId,
        formRef.current!,
        settings.emailjs.publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const contactInfo = [
    { icon: Mail, text: settings.email, href: `mailto:${settings.email}`, label: t('contact.info.email') },
    { icon: Phone, text: settings.phone || '+1 (555) 123-4567', href: `tel:${settings.phone}`, label: t('contact.info.phone') },
    { icon: MapPin, text: settings.location || 'San Francisco, CA', href: `https://maps.google.com/?q=${encodeURIComponent(settings.location || 'San Francisco, CA')}`, label: t('contact.info.location') },
  ];

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
            }`}>{t('contact.title')}</h1>
            <div className={`w-24 h-1 mx-auto rounded-full mb-8 ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
            }`} />
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="md:col-span-1 space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.icon !== Phone && info.icon !== Mail ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`block p-6 rounded-xl transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 hover:bg-gray-700/50'
                      : 'bg-white/70 hover:bg-gray-50/70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {info.label}
                      </h3>
                      <p className={
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }>{info.text}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`md:col-span-2 p-8 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-800/50'
                  : 'bg-white/70'
              }`}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className={`block mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700/50 text-white focus:bg-gray-600/50'
                        : 'bg-white text-gray-900 focus:bg-gray-50'
                    } ${errors.name ? 'border-2 border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-red-500 text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className={`block mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700/50 text-white focus:bg-gray-600/50'
                        : 'bg-white text-gray-900 focus:bg-gray-50'
                    } ${errors.email ? 'border-2 border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-red-500 text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className={`block mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700/50 text-white focus:bg-gray-600/50'
                        : 'bg-white text-gray-900 focus:bg-gray-50'
                    } ${errors.subject ? 'border-2 border-red-500' : ''}`}
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-red-500 text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className={`block mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700/50 text-white focus:bg-gray-600/50'
                        : 'bg-white text-gray-900 focus:bg-gray-50'
                    } ${errors.message ? 'border-2 border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-red-500 text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      theme === 'dark'
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } ${submitStatus === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={submitStatus !== 'idle'}
                  >
                    {submitStatus === 'idle' && (
                      <>
                        <Send className="w-5 h-5" />
                        {t('contact.form.send')}
                      </>
                    )}
                    {submitStatus === 'loading' && (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        {t('contact.form.sending')}
                      </>
                    )}
                    {submitStatus === 'success' && (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        {t('contact.form.sent')}
                      </>
                    )}
                    {submitStatus === 'error' && (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        {t('contact.form.error')}
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}