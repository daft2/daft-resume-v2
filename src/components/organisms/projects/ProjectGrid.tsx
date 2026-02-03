import { useEffect, useState } from "react";
import { getHighlighted, Portfolio } from "@/lib/portfolio";
import {
  SiAppstore,
  SiGithub,
  SiGoogleplay,
} from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";

export default function ProjectGrid() {
  const [data, setData] = useState<Portfolio[]>();

  useEffect(() => {
    getHighlighted()
      .then(({ documents }) => setData(documents as Portfolio[]))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((project, index) => (
        <ProjectCard key={project.$id} project={project} index={index} />
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Portfolio; index: number }) {
  return (
    <div className="card group overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quest number — subtle pixel font accent */}
        <div className="absolute top-3 left-3">
          <span className="font-pixel text-[7px] text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1 rounded tracking-wider">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-sm tracking-tight mb-1.5">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-text-secondary text-xs leading-relaxed mb-4 flex-1">
            {project.description}
          </p>
        )}

        {/* Links */}
        <div className="flex items-center gap-1.5 mt-auto">
          {project.githubUrl && (
            <LinkButton href={project.githubUrl} label="GitHub">
              <SiGithub className="size-3.5" />
            </LinkButton>
          )}
          {project.googleUrl && (
            <LinkButton href={project.googleUrl} label="Google Play">
              <SiGoogleplay className="size-3.5" />
            </LinkButton>
          )}
          {project.appleUrl && (
            <LinkButton href={project.appleUrl} label="App Store">
              <SiAppstore className="size-3.5" />
            </LinkButton>
          )}
          {project.liveUrl && (
            <LinkButton href={project.liveUrl} label="Live">
              <ExternalLink className="size-3.5" />
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
}

function LinkButton({
  children,
  href,
  label,
}: {
  children: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent-subtle transition-all duration-200"
    >
      {children}
    </a>
  );
}
