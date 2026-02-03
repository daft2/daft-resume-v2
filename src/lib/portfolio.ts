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
  },
  {
    $id: "4",
    title: "Weather Dashboard",
    imageUrl: "https://placehold.co/600x400/533483/e94560?text=Weather+App",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    isHighlighted: false,
  },
  {
    $id: "5",
    title: "Task Manager CLI",
    imageUrl: "https://placehold.co/600x400/2b2e4a/e94560?text=Task+CLI",
    githubUrl: "https://github.com",
    isHighlighted: false,
  },
  {
    $id: "6",
    title: "Recipe Finder",
    imageUrl: "https://placehold.co/600x400/1a1a2e/53a8b6?text=Recipe+Finder",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    isHighlighted: false,
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
