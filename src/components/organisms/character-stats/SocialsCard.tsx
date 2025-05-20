import Tooltip from "components/atoms/tooltip/Tooltip";
import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const SocialsCard = () => {
  return (
    <div className="rpg-panel flex flex-row justify-center gap-2">
      <Tooltip text="Github">
        <button
          className="relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
          type="button"
        >
          <Github className="size-6 text-arcade-red" />
          <div className="shine-effect"></div>
        </button>
      </Tooltip>
      <Tooltip text="Linkedin">
        <button
          className="relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
          type="button"
        >
          <Linkedin className="size-6 text-arcade-blue" />
        </button>
      </Tooltip>
      <Tooltip text="Email">
        <button
          className="relative overflow-hidden border-black px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 transform hover:translate-y-1 "
          type="button"
        >
          <Mail className="size-6 text-arcade-green" />
        </button>
      </Tooltip>
    </div>
  );
};

export default SocialsCard;
