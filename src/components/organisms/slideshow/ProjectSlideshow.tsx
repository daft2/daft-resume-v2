import { getPortfolio, Portfolio } from "@/lib/portfolio";
import { SiAppstore, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { Github, SquareArrowOutUpRight, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectsSlideshow() {
  const [data, setData] = useState<Portfolio[]>();

  useEffect(() => {
    getPortfolio()
      .then(({ documents }) => setData(documents as Portfolio[]))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="rpg-panel h-full flex flex-col gap-3">
      <div className="rpg-header">
        <FolderOpen className="size-4 text-arcade-green" />
        <span className="font-pixel text-[8px] xl:text-[9px] tracking-wider">
          INVENTORY
        </span>
        <span className="font-mono text-[10px] text-dark-text-secondary ml-2">
          // more projects
        </span>
      </div>

      <div className="flex flex-row gap-4 py-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {data?.map((project) => (
          <div
            key={project.$id}
            className="flex flex-col min-w-[11rem] group"
          >
            <div className="relative overflow-hidden rounded-sm border border-dark-border dark:border-dark-border group-hover:border-arcade-cyan/30 transition-all">
              <img
                width={250}
                height={250}
                src={project.imageUrl}
                alt={`Image of ${project.title}`}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-arcade-cyan/0 group-hover:bg-arcade-cyan/5 transition-colors duration-300" />
            </div>
            <div className="flex flex-col gap-1.5 pt-2">
              <h3 className="font-mono text-xs text-center tracking-wide">
                {project.title}
              </h3>
              <div className="flex flex-row items-center justify-center gap-2">
                {project.githubUrl && (
                  <a target="_blank" href={project.githubUrl}>
                    <Github className="size-3.5 text-dark-text-secondary hover:text-arcade-cyan cursor-pointer transition-colors" />
                  </a>
                )}
                {project.appleUrl && (
                  <a target="_blank" href={project.appleUrl}>
                    <SiAppstore className="size-3.5 text-dark-text-secondary hover:text-arcade-cyan cursor-pointer transition-colors" />
                  </a>
                )}
                {project.googleUrl && (
                  <a target="_blank" href={project.googleUrl}>
                    <SiGoogleplay className="size-3.5 text-dark-text-secondary hover:text-arcade-cyan cursor-pointer transition-colors" />
                  </a>
                )}
                {project.liveUrl && (
                  <a target="_blank" href={project.liveUrl}>
                    <SquareArrowOutUpRight className="size-3.5 text-dark-text-secondary hover:text-arcade-cyan cursor-pointer transition-colors" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
