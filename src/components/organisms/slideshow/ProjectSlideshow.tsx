import { getPortfolio, Portfolio } from "@/lib/appwrite";
import { SiAppstore, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectsSlideshow() {
  const [data, setData] = useState<Portfolio[]>();

  useEffect(() => {
    getPortfolio()
      .then(({ documents }) => setData(documents as Portfolio[]))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="rpg-panel h-full flex flex-col justify-center gap-2">
      <h1 className="text-lg font-bold">PORTFOLIO</h1>
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-full flex flex-row gap-4 py-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {data?.map((project) => (
            <div key={project.$id} className="flex flex-col min-w-[12rem]">
              <img
                width={250}
                height={250}
                src={project.imageUrl}
                alt={`Image of ${project.title}`}
                className="rounded hover:scale-105 transition delay-50"
              />
              <div className="flex flex-col gap-1">
                <h1 className="pt-2 text-center">{project.title}</h1>
                <div className="flex flex-row items-center justify-center gap-2">
                  {project.githubUrl && (
                    <a target="_blank" href={project.githubUrl}>
                      <Github className="size-4 hover:text-arcade-blue cursor-pointer" />
                    </a>
                  )}
                  {project.appleUrl && (
                    <a target="_blank" href={project.appleUrl}>
                      <SiAppstore className="size-4 hover:text-arcade-blue cursor-pointer" />
                    </a>
                  )}
                  {project.googleUrl && (
                    <a target="_blank" href={project.googleUrl}>
                      <SiGoogleplay className="size-4 hover:text-arcade-blue cursor-pointer" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a target="_blank" href={project.liveUrl}>
                      <SquareArrowOutUpRight className="size-4 hover:text-arcade-blue cursor-pointer" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
