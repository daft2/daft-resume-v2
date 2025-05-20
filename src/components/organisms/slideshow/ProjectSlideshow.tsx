import { SiAppstore, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { Github, SquareArrowOutUpRight } from "lucide-react";

export default function ProjectsSlideshow() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with product catalog, shopping cart, and payment processing.",
      image: "https://placehold.co/600x400",
      github: "https://github.com",
      demo: "https://example.com",
      color: "arcade-red",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A productivity application for managing tasks, projects, and team collaboration.",
      image: "https://placehold.co/600x400",
      github: "https://github.com",
      demo: "https://example.com",
      color: "arcade-blue",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A personal portfolio website with a unique game-inspired UI design.",
      image: "https://placehold.co/600x400",
      github: "https://github.com",
      demo: "https://example.com",
      color: "arcade-green",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A personal portfolio website with a unique game-inspired UI design.",
      image: "https://placehold.co/600x400",
      github: "https://github.com",
      demo: "https://example.com",
      color: "arcade-green",
    },
  ];

  return (
    <div className="rpg-panel h-full flex flex-col justify-center gap-2">
      <h1 className="text-lg font-bold">PORTFOLIO</h1>
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-full flex flex-row gap-4 py-4 overflow-x-auto">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col min-w-[12rem]">
              <img
                width={250}
                height={250}
                src={project.image}
                alt={`Image of ${project.title}`}
                className="rounded hover:scale-105 transition delay-50"
              />
              <div className="flex flex-col gap-1">
                <h1 className="pt-2 text-center">{project.title}</h1>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Github className="size-4 hover:text-arcade-blue cursor-pointer" />
                  <SiAppstore className="size-4 hover:text-arcade-blue cursor-pointer" />
                  <SiGoogleplay className="size-4 hover:text-arcade-blue cursor-pointer" />
                  <SquareArrowOutUpRight className="size-4 hover:text-arcade-blue cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
