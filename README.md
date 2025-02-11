# DevFolio - Modern Developer Portfolio

<div align="center">

<!-- License and Version Badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)

<!-- GitHub Stats Badges -->
[![GitHub stars](https://img.shields.io/github/stars/eshanized/devfolio?style=for-the-badge&logo=github&color=yellow)](https://github.com/eshanized/devfolio/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/eshanized/devfolio?style=for-the-badge&logo=github&color=blue)](https://github.com/eshanized/devfolio/network)
[![GitHub issues](https://img.shields.io/github/issues/eshanized/devfolio?style=for-the-badge&logo=github&color=red)](https://github.com/eshanized/devfolio/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/eshanized/devfolio?style=for-the-badge&logo=github&color=green)](https://github.com/eshanized/devfolio/pulls)

<!-- CI/CD Badge -->
[![Deploy Status](https://img.shields.io/github/actions/workflow/status/eshanized/devfolio/deploy.yml?style=for-the-badge&logo=github-actions&label=deploy)](https://github.com/eshanized/devfolio/actions/workflows/deploy.yml)

<!-- Tech Stack Badges -->
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<!-- Additional Tech Badges -->
[![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

A beautiful, fully featured, and production-ready portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

![DevFolio Preview](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop)

## Overview

DevFolio is a modern, professional portfolio template designed for developers who want to showcase their work in style. Built with the latest web technologies, it offers a perfect balance of aesthetics and functionality.

### Why DevFolio?

- **Modern Stack**: Built with React 18, TypeScript, and Vite for optimal performance and developer experience
- **Beautiful Design**: Carefully crafted UI with smooth animations and a responsive layout
- **Production Ready**: Includes GitHub Actions for CI/CD, comprehensive testing, and optimized builds
- **Internationalization**: Built-in support for multiple languages with easy configuration
- **Dark/Light Mode**: Elegant theme switching with system preference detection
- **SEO Optimized**: Proper meta tags and semantic HTML for better search engine visibility

### Technical Architecture

- **Frontend**: React with TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for smooth, performant animations
- **State Management**: React Context for theme and language preferences
- **API Integration**: GitHub API for dynamic project showcase
- **Contact Form**: EmailJS for serverless form submission
- **Build Tool**: Vite for lightning-fast development and optimized production builds
- **Deployment**: GitHub Actions for automated deployment to GitHub Pages

### Code Quality

- ESLint for code quality
- TypeScript for type safety
- Prettier for consistent code formatting
- GitHub Actions for continuous integration
- Comprehensive documentation

## Features

- 🌓 Dark/Light mode
- 🌐 Internationalization (i18n) support
- 🎨 Modern and clean design
- 📱 Fully responsive
- ⚡ Fast and optimized
- 🔄 Smooth animations with Framer Motion
- 📧 Contact form with EmailJS integration
- 🔍 Dynamic GitHub projects showcase
- 📊 GitHub stats integration
- 🎯 Skills and expertise section
- 📝 About page with work experience and education
- 🔗 Social media links

## Prerequisites

Before you begin, ensure you have the following:
- Node.js (v18 or higher)
- npm or yarn
- Git
- GitHub Personal Access Token (for GitHub API integration)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devfolio.git
cd devfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Vite Configuration Guide

The project uses an enhanced Vite configuration for optimal development and production builds. Here's a breakdown of the key features:

### Development Server

```typescript
server: {
  open: true,      // Automatically open in browser
  hmr: true,       // Hot Module Replacement
  port: 3000,      // Development port
  cors: true,      // CORS enabled
  proxy: {         // API proxy configuration
    '/api': {
      target: env.VITE_API_URL || 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### Build Optimization

```typescript
build: {
  outDir: 'dist',
  cssCodeSplit: true,
  reportCompressedSize: true,
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'animation-vendor': ['framer-motion'],
        'i18n-vendor': ['i18next', 'react-i18next'],
      },
    },
  },
  sourcemap: true,
}
```

### Path Aliases

```typescript
resolve: {
  alias: {
    '@': resolve(__dirname, './src'),
  },
}
```

### CSS Processing

```typescript
css: {
  modules: {
    localsConvention: 'camelCase',
  },
  postcss: {
    plugins: [require('tailwindcss'), require('autoprefixer')],
  },
  devSourcemap: true,
}
```

### Environment Variables

The configuration automatically loads environment variables based on the current mode:

```typescript
const env = loadEnv(mode, process.cwd(), '');
```

Create a `.env` file in the project root for local development:

```bash
VITE_API_URL=http://localhost:8080
VITE_GITHUB_TOKEN=your_token_here
```

### Custom Configuration

To customize the Vite configuration, modify `vite.config.ts`. Common customizations include:

- Adding new path aliases
- Configuring additional build optimizations
- Setting up proxies for API endpoints
- Adding Vite plugins

## Configuration

### Basic Information

Update `src/settings.ts` with your personal information:

```typescript
export const settings = {
  githubUsername: 'your-github-username',
  name: 'Your Name',
  role: 'Your Role',
  email: 'your.email@example.com',
  phone: 'your-phone-number',
  location: 'Your Location',
  // ... other settings
};
```

### Translation Setup

The project uses i18next for internationalization. By default, it supports English (en) and Bengali (bn).

#### Enable/Disable Translations

In `src/settings.ts`, you can enable or disable translations:

```typescript
features: {
  enableTranslation: true, // Set to false to disable translation feature
  defaultLanguage: 'en',
  availableLanguages: ['en', 'bn'], // Add or remove languages here
}
```

#### Adding a New Language

1. Open `src/i18n/translations.ts`
2. Add your new language code and translations:

```typescript
export const translations = {
  en: {
    translation: {
      // English translations
    }
  },
  bn: {
    translation: {
      // Bengali translations
    }
  },
  // Add your new language here
  fr: {
    translation: {
      name: 'Your Name in French',
      role: 'Your Role in French',
      // Copy the structure from the English translations
      // and translate each value
    }
  }
};
```

3. Add the language code to `availableLanguages` in `settings.ts`:

```typescript
features: {
  enableTranslation: true,
  defaultLanguage: 'en',
  availableLanguages: ['en', 'bn', 'fr'], // Add your language code here
}
```

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new Email Service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{name}}`
   - `{{email}}`
   - `{{subject}}`
   - `{{message}}`
4. Get your credentials and update `src/settings.ts`:

```typescript
emailjs: {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
}
```

### GitHub Token Setup

To use the GitHub integration features, you need to create a Personal Access Token:

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "DevFolio Portfolio")
4. Select the following scopes:
   - `read:user` - For reading user profile info
   - `repo` - For accessing public repositories
5. Click "Generate token"
6. **IMPORTANT**: Copy your token immediately! You won't be able to see it again.

### Using the Token

1. Create a `.env` file in the project root:
```bash
VITE_GITHUB_TOKEN=your_token_here
```

## Building for Production

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

The built files will be in the `dist` directory, ready for deployment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this project helpful, please give it a ⭐️ on GitHub!