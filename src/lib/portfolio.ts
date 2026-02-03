export interface Portfolio {
  $id: string;
  title: string;
  description?: string;
  appleUrl?: string;
  googleUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  isHighlighted?: boolean;
  tags?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  current?: boolean;
}

const portfolioItems: Portfolio[] = [
  {
    $id: "1",
    title: "Mobile Banking App",
    description:
      "A modern mobile banking application with real-time transaction tracking, budgeting tools, and seamless payment integration.",
    imageUrl: "https://placehold.co/600x400/1a1a2e/e94560?text=Banking+App",
    githubUrl: "https://github.com",
    googleUrl: "https://play.google.com",
    appleUrl: "https://apps.apple.com",
    isHighlighted: true,
    tags: ["React Native", "TypeScript", "Firebase"],
  },
  {
    $id: "2",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform featuring product search, cart management, and secure checkout powered by Stripe.",
    imageUrl: "https://placehold.co/600x400/16213e/0f3460?text=E-Commerce",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    isHighlighted: true,
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    $id: "3",
    title: "Fitness Tracker",
    description:
      "Cross-platform fitness tracking app with workout logging, progress charts, and social challenges.",
    imageUrl: "https://placehold.co/600x400/0f3460/e94560?text=Fitness+Tracker",
    googleUrl: "https://play.google.com",
    appleUrl: "https://apps.apple.com",
    isHighlighted: true,
    tags: ["Expo", "Node.js", "MongoDB"],
  },
  {
    $id: "4",
    title: "Weather Dashboard",
    imageUrl: "https://placehold.co/600x400/533483/e94560?text=Weather+App",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    isHighlighted: false,
    tags: ["React", "API"],
  },
  {
    $id: "5",
    title: "Task Manager CLI",
    imageUrl: "https://placehold.co/600x400/2b2e4a/e94560?text=Task+CLI",
    githubUrl: "https://github.com",
    isHighlighted: false,
    tags: ["Node.js", "CLI"],
  },
  {
    $id: "6",
    title: "Recipe Finder",
    imageUrl: "https://placehold.co/600x400/1a1a2e/53a8b6?text=Recipe+Finder",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    isHighlighted: false,
    tags: ["React", "REST API"],
  },
];

const experienceItems: Experience[] = [
  {
    company: "Tech Corp",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    description:
      "Leading mobile development initiatives, architecting cross-platform solutions, and mentoring junior engineers.",
    current: true,
  },
  {
    company: "Startup Studio",
    role: "Software Engineer",
    period: "2021 — 2023",
    description:
      "Built and shipped 3 consumer-facing mobile apps from zero to production. Owned the entire frontend stack.",
  },
  {
    company: "Digital Agency",
    role: "Frontend Developer",
    period: "2020 — 2021",
    description:
      "Developed responsive web applications for enterprise clients using React and TypeScript.",
  },
];

export const getHighlighted = async () => {
  return {
    documents: portfolioItems.filter((item) => item.isHighlighted),
  };
};

export const getPortfolio = async () => {
  return {
    documents: portfolioItems.filter((item) => !item.isHighlighted),
  };
};

export const getExperience = async () => {
  return { documents: experienceItems };
};
