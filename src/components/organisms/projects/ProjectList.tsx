import { useEffect, useState } from "react";
import { getPortfolio, Portfolio } from "@/lib/portfolio";
import { SiAppstore, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectList() {
  const [data, setData] = useState<Portfolio[]>();

  useEffect(() => {
    getPortfolio()
      .then(({ documents }) => setData(documents as Portfolio[]))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {data?.map((project) => (
        <div
          key={project.$id}
          className="card group flex items-center gap-4 p-3 md:p-4 hover:border-accent/20"
        >
          {/* Thumbnail */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium tracking-tight truncate">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-text-tertiary text-xs truncate mt-0.5">
                {project.description}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-tertiary hover:text-accent transition-colors p-1.5"
              >
                <Github className="size-4" />
              </a>
            )}
            {project.googleUrl && (
              <a
                href={project.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Play"
                className="text-text-tertiary hover:text-accent transition-colors p-1.5"
              >
                <SiGoogleplay className="size-4" />
              </a>
            )}
            {project.appleUrl && (
              <a
                href={project.appleUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="App Store"
                className="text-text-tertiary hover:text-accent transition-colors p-1.5"
              >
                <SiAppstore className="size-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live"
                className="text-text-tertiary hover:text-accent transition-colors p-1.5"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
