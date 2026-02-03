import Tooltip from "@/components/atoms/tooltip/Tooltip";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Mail, Linkedin, Link2 } from "lucide-react";

const url = {
  linkedin: "https://www.linkedin.com/in/muhammad-daffa-s",
  github: "https://www.github.com/daft2",
  mail: "mailto:daftdevs@gmail.com",
};

const SocialsCard = () => {
  return (
    <div className="rpg-panel">
      <div className="rpg-header mb-3">
        <Link2 className="size-3 text-arcade-green" />
        <span className="font-pixel text-[7px] tracking-wider">LINKS</span>
      </div>
      <div className="h-full flex flex-row justify-center gap-2">
        <Tooltip text="Github">
          <a
            target="_blank"
            href={url.github}
            className="highlight-effect relative overflow-hidden px-3 py-2.5 rounded-sm bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border hover:border-arcade-red/50 transition-all duration-300 group"
          >
            <SiGithub className="size-5 text-arcade-red group-hover:drop-shadow-[0_0_6px_rgba(255,0,60,0.5)] transition-all" />
          </a>
        </Tooltip>
        <Tooltip text="LinkedIn">
          <a
            target="_blank"
            href={url.linkedin}
            className="highlight-effect relative overflow-hidden px-3 py-2.5 rounded-sm bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border hover:border-arcade-blue/50 transition-all duration-300 group"
          >
            <Linkedin className="size-5 text-arcade-blue group-hover:drop-shadow-[0_0_6px_rgba(0,112,243,0.5)] transition-all" />
          </a>
        </Tooltip>
        <Tooltip text="Email">
          <a
            target="_blank"
            href={url.mail}
            className="highlight-effect relative overflow-hidden px-3 py-2.5 rounded-sm bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border hover:border-arcade-green/50 transition-all duration-300 group"
          >
            <Mail className="size-5 text-arcade-green group-hover:drop-shadow-[0_0_6px_rgba(0,255,144,0.5)] transition-all" />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default SocialsCard;
