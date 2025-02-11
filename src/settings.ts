interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface WorkExperience {
  position: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface SocialMedia {
  platform: string;
  url: string;
}

interface EmailJS {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

interface Features {
  enableTranslation: boolean;
  defaultLanguage: 'en' | 'bn';
  availableLanguages: ('en' | 'bn')[];
}

export const settings = {
  githubUsername: 'eshanized',
  devToUsername: 'eshanized', // Add your dev.to username here to enable the Articles page
  name: 'Eshan Roy',
  role: 'Senior Software Engineer',
  email: 'contact@eshanroy.dev',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  features: {
    enableTranslation: true, // Set to false to disable translation feature
    defaultLanguage: 'en',
    availableLanguages: ['en', 'bn'], // Only English and Bengali
  } as Features,
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
  } as EmailJS,
  about: {
    introduction: "I'm a passionate software engineer with a love for creating elegant solutions to complex problems. My journey in tech started when I wrote my first line of code, and I've been hooked ever since.",
    motivation: "What drives me is the endless possibility to learn and create. Every day in software development brings new challenges and opportunities to grow. I'm particularly passionate about open source and contributing back to the community.",
    workExperience: [
      {
        position: "Senior Software Engineer",
        company: "Meta",
        period: "2020 - Present",
        description: [
          "Lead developer for React Core team",
          "Contributed to major architectural decisions and improvements",
          "Mentored junior developers and conducted technical interviews",
          "Wrote technical documentation and blog posts"
        ],
        technologies: ["React", "JavaScript", "TypeScript", "GraphQL"]
      },
      {
        position: "Software Engineer",
        company: "Facebook",
        period: "2018 - 2020",
        description: [
          "Developed and maintained critical frontend infrastructure",
          "Improved application performance by 40%",
          "Implemented new features and fixed critical bugs",
          "Collaborated with cross-functional teams"
        ],
        technologies: ["React", "Redux", "Node.js", "Jest"]
      }
    ] as WorkExperience[],
    education: [
      {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        year: "2018-2020",
        description: "Focused on distributed systems and machine learning"
      },
      {
        degree: "Bachelor of Engineering in Software Engineering",
        institution: "MIT",
        year: "2014-2018",
        description: "Core computer science fundamentals and software engineering practices"
      }
    ] as Education[],
  },
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    frameworks: ['React', 'Node.js', 'Express', 'Next.js'],
    tools: ['Git', 'Docker', 'AWS', 'MongoDB'],
  },
  socialMedia: [
    {
      platform: 'Twitter',
      url: 'https://twitter.com/eshanized'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/eshanized'
    }
  ] as SocialMedia[],
};