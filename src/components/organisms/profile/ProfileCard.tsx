import { SiGithub } from "@icons-pack/react-simple-icons";
import { Mail, Linkedin, Download } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    href: "https://www.github.com/daft2",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-daffa-s",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:daftdevs@gmail.com",
    icon: Mail,
  },
];

const ProfileCard = () => {
  return (
    <div className="card p-5 md:p-6">
      {/* Avatar */}
      <div className="mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-2 ring-border">
          <img
            src="avatar.avif"
            className="w-full h-full object-cover"
            alt="Muhammad Daffa"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mb-5">
        <h1 className="text-lg md:text-xl font-semibold tracking-tight mb-1">
          Muhammad Daffa
        </h1>
        <p className="text-text-secondary text-sm">
          Software Engineer
        </p>
        <p className="text-text-tertiary text-sm mt-2.5 leading-relaxed">
          Building products that people love to use. Focused on mobile &amp; web development.
        </p>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-2 mb-4">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent-subtle transition-all duration-200"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>

      {/* Resume */}
      <a
        href="https://drive.google.com/file/d/1SDemXlTIQkUY5bIe1vvqzO8aCo4nzdZ-/view"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-accent text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-200"
      >
        <Download className="size-4" />
        Resume
      </a>
    </div>
  );
};

export default ProfileCard;
