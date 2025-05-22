import Tooltip from "@/components/atoms/tooltip/Tooltip";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Mail, Linkedin } from "lucide-react";

const url = {
  linkedin: "https://www.linkedin.com/in/muhammad-daffa-s",
  github: "https://www.github.com/daft2",
  mail: "mailto:daftdevs@gmail.com",
};

const SocialsCard = () => {
  return (
    <div className="rpg-panel">
      <div className="h-full flex flex-row justify-center gap-2">
        <Tooltip text="Github">
          <a
            target="_blank"
            href={url.github}
            className="highlight-effect relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
            type="button"
          >
            <SiGithub className="size-6 text-arcade-red" />
          </a>
        </Tooltip>
        <Tooltip text="Linkedin">
          <a
            target="_blank"
            href={url.linkedin}
            className="highlight-effect relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
            type="button"
          >
            <Linkedin className="size-6 text-arcade-blue" />
          </a>
        </Tooltip>
        <Tooltip text="Email">
          <a
            target="_blank"
            href={url.mail}
            className="highlight-effect relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
            type="button"
          >
            <Mail className="size-6 text-arcade-green" />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default SocialsCard;
