import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { Articles } from './pages/Articles';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SponsorButton } from './components/SponsorButton';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';
import { fetchGithubProfile } from './lib/github';
import { settings } from './settings';

function App() {
  useEffect(() => {
    const updateTitleAndFavicon = async () => {
      try {
        const profile = await fetchGithubProfile(settings.githubUsername);
        // Update title
        document.title = `${profile.name} | Portfolio`;
        
        // Update favicon if avatar exists
        if (profile.avatar_url) {
          const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (!link) {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            document.head.appendChild(newLink);
          }
          const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          favicon.href = profile.avatar_url;
        }
      } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        document.title = 'DevFolio | Portfolio';
      }
    };

    updateTitleAndFavicon();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen transition-colors dark:bg-gray-900 bg-gray-50 font-lato">
          <Navbar />
          <main className="pt-20 pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              {settings.devToUsername && (
                <Route path="/articles" element={<Articles />} />
              )}
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <SponsorButton />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App