import Tooltip from "@/components/atoms/tooltip/Tooltip";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Mail, Linkedin } from "lucide-react";

const SocialsCard = () => {
  return (
    <div className="rpg-panel">
      <div className="h-full flex flex-row justify-center gap-2">
        <Tooltip text="Github">
          <button
            className="highlight-effect relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
            type="button"
          >
            <SiGithub className="size-6 text-arcade-red" />
          </button>
        </Tooltip>
        <Tooltip text="Linkedin">
          <button
            className="highlight-effect relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
            type="button"
          >
            <Linkedin className="size-6 text-arcade-blue" />
          </button>
        </Tooltip>
        <Tooltip text="Email">
          <button
            className="highlight-effect relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
            type="button"
          >
            <Mail className="size-6 text-arcade-green" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SocialsCard;
