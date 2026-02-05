import { useEffect, useState, useCallback, useRef } from "react";
import ThemeButton from "@/components/atoms/button/ThemeButton";
import {
  getHighlighted,
  getPortfolio,
  getExperience,
  Portfolio,
  Experience,
} from "@/lib/portfolio";
import { getLenis } from "@/lib/useLenis";
import { AITerminal, AITerminalTrigger } from "@/components/organisms/ai-terminal";
import { initScrollReveal } from "@/lib/useScrollReveal";

import { SiGithub, SiGoogleplay, SiAppstore } from "@icons-pack/react-simple-icons";
import {
  ExternalLink,
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Gamepad2,
  Coffee,
  Headphones,
  Menu,
  X,
  Zap,
  FolderCode,
} from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiExpress,
  SiNodedotjs,
  SiFirebase,
  SiMysql,
} from "@icons-pack/react-simple-icons";

function App() {
  const [highlighted, setHighlighted] = useState<Portfolio[]>([]);
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    getHighlighted().then(({ documents }) => setHighlighted(documents as Portfolio[]));
    getPortfolio().then(({ documents }) => setProjects(documents as Portfolio[]));
    getExperience().then(({ documents }) => setExperience(documents));
  }, []);

  // Initialize scroll reveal animations
  useEffect(() => {
    const timer = setTimeout(() => {
      initScrollReveal();
    }, 100);
    return () => clearTimeout(timer);
  }, [highlighted, projects, experience]);

  // Scroll spy for active section + scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["work", "about"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to anchor using Lenis
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    // Only handle internal anchor links
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const lenis = getLenis();
        lenis?.scrollTo(target, { offset: -100, duration: 1.2 });
      }
    }
  }, []);

  // Handle Cmd/Ctrl+K for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* ─── AI TERMINAL ─── */}
      <AITerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <AITerminalTrigger onClick={() => setTerminalOpen(true)} />

      {/* ─── NAV ─── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "backdrop-blur-2xl bg-bg/80 [backdrop-filter:saturate(180%)_blur(20px)]"
            : "bg-transparent"
        }`}
      >
        {/* Subtle gradient line instead of hard border */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}>
          <div className="h-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="h-[72px] flex items-center justify-between">
            {/* ── Left: Logo/Name ── */}
            <a href="#" className="group flex items-center gap-2.5">
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
                daftdevs
              </span>
              <span className="relative flex h-2 w-2">
                <span className="nav-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
            </a>

            {/* ── Center: Nav links (desktop) ── */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "Work", href: "#work", id: "work" },
                { label: "About", href: "#about", id: "about" },
                { label: "Contact", href: "mailto:daftdevs@gmail.com", id: "contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link relative px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  {/* Active indicator */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-accent transition-all duration-300 ease-out ${
                    activeSection === item.id ? "w-4 opacity-100" : "w-0 opacity-0"
                  }`} />
                </a>
              ))}
            </div>

            {/* ── Right: Actions ── */}
            <div className="flex items-center gap-3">
              <ThemeButton />

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative flex items-center justify-center w-10 h-10 text-text-secondary hover:text-text-primary transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`} />
                  <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 scale-0" : ""
                  }`} />
                  <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-8 pt-4">
            <div className="flex flex-col gap-1">
              {[
                { label: "Work", href: "#work", id: "work" },
                { label: "About", href: "#about", id: "about" },
                { label: "Contact", href: "mailto:daftdevs@gmail.com", id: "contact" },
              ].map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group flex items-center justify-between py-4 border-b border-border/40 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-text-primary"
                      : "text-text-secondary"
                  }`}
                  style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms" }}
                >
                  <span className="text-[22px] font-medium tracking-[-0.02em] group-hover:text-text-primary transition-colors">
                    {item.label}
                  </span>
                  <ArrowUpRight className={`size-5 transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-accent opacity-100"
                      : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                  }`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 md:pt-48 pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="hero-enter hero-enter-1">
          <p className="section-label mb-8">
            <span className="label-dot" />
            available for work
          </p>
        </div>

        <h1 className="max-w-[1000px] mb-8 md:mb-10">
          <span className="hero-line block">
            <span className="hero-line-inner text-[clamp(2.75rem,10vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              Muhammad Daffa
            </span>
          </span>
          <span className="hero-line block">
            <span className="hero-line-inner delay-1 text-[clamp(2.75rem,10vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-text-tertiary">
              builds products
            </span>
          </span>
          <span className="hero-line block">
            <span className="hero-line-inner delay-2 text-[clamp(2.75rem,10vw,7rem)] font-serif italic font-light leading-[1] tracking-[-0.02em] text-text-secondary">
              people actually use
            </span>
          </span>
        </h1>

        <div className="hero-enter hero-enter-3 max-w-[520px]">
          <p className="text-body-lg text-text-secondary">
            Software engineer focused on mobile & web. Turning complex problems into clean, intuitive experiences.
          </p>
        </div>

        <div className="hero-enter hero-enter-4 mt-10 flex flex-wrap items-center gap-3">
          <a
            href="mailto:daftdevs@gmail.com"
            className="btn-primary"
          >
            Get in touch
            <ArrowUpRight className="size-3.5 btn-icon" />
          </a>
          <a
            href="https://drive.google.com/file/d/1SDemXlTIQkUY5bIe1vvqzO8aCo4nzdZ-/view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Download className="size-3.5 btn-icon" />
            Resume
          </a>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section id="work" className="pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-12 md:mb-16 reveal">
          <div className="section-label">
            <span className="label-dot" />
            quest log
          </div>
          <span className="text-micro text-text-tertiary font-mono uppercase">
            {highlighted.length} featured
          </span>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {highlighted.map((project, i) => (
            <div key={project.$id} className="reveal">
              <FeaturedProject project={project} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENTO GRID — About / Experience / Stack / Personality ─── */}
      <section id="about" className="pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="section-label mb-12 md:mb-16 reveal">
          <span className="label-dot" />
          character sheet
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4">
          {/* Profile — spans 5 cols (prominent) */}
          <div className="lg:col-span-5 p-5 rounded-2xl border border-border bg-surface card-prominent reveal">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-border">
                <img
                  src="avatar.avif"
                  className="w-full h-full object-cover"
                  alt="Muhammad Daffa"
                />
              </div>
              <div>
                <h3 className="text-body font-semibold tracking-tight">Muhammad Daffa</h3>
                <p className="text-caption text-text-secondary mt-0.5">Software Engineer</p>
                <div className="flex items-center gap-1 mt-1.5 text-micro text-text-tertiary">
                  <MapPin className="size-3" />
                  Indonesia
                </div>
              </div>
            </div>
            <p className="text-caption text-text-secondary leading-relaxed mb-6">
              Building products that people love to use. Focused on mobile & web development, with a passion for clean code and great user experiences.
            </p>
            <div className="flex items-center gap-2">
              {[
                { label: "GitHub", href: "https://www.github.com/daft2", icon: Github },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-daffa-s", icon: Linkedin },
                { label: "Email", href: "mailto:daftdevs@gmail.com", icon: Mail },
              ].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-icon-circle"
                >
                  <Icon className="size-[15px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Tech Loadout — spans 7 cols */}
          <div className="lg:col-span-7 p-5 rounded-2xl border border-border bg-surface reveal">
            <div className="section-label mb-5">
              <span className="label-dot" />
              loadout
            </div>
            <TechLoadout />
          </div>

          {/* Experience timeline — spans 7 cols */}
          <div className="lg:col-span-7 p-5 rounded-2xl border border-border bg-surface reveal">
            <div className="section-label mb-5">
              <span className="label-dot" />
              party history
            </div>
            <div className="flex flex-col">
              {experience.map((exp, i) => (
                <ExperienceRow key={exp.company} exp={exp} isLast={i === experience.length - 1} />
              ))}
            </div>
          </div>

          {/* Personality tiles — spans 5 cols, split into sub-grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4">
            {/* Hobbies tile */}
            <div className="col-span-2 p-5 rounded-2xl border border-border bg-surface reveal">
              <span className="text-micro text-text-tertiary font-mono uppercase block mb-4">Off-screen</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Gamepad2, label: "Gaming" },
                  { icon: Coffee, label: "Coffee" },
                  { icon: Headphones, label: "Music" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-caption text-text-secondary">
                    <div className="w-8 h-8 rounded-lg bg-surface-raised border border-border flex items-center justify-center">
                      <Icon className="size-3.5 text-text-tertiary" />
                    </div>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* YOE tile - prominent */}
            <div className="p-5 rounded-2xl bg-accent/10 border border-accent/10 dark:border-accent/15 flex flex-col reveal">
              <div className="flex items-center justify-between mb-3">
                <span className="text-micro text-accent font-mono uppercase tracking-wider">Level</span>
                <Zap className="size-4 text-accent" />
              </div>
              <span className="text-[2.5rem] font-semibold text-text-primary leading-none tracking-tight">4+</span>
              <span className="text-caption text-text-secondary mt-1">years exp</span>
              {/* XP Bar */}
              <div className="mt-3 h-1.5 bg-accent/20 rounded-full overflow-hidden">
                <div className="h-full w-[40%] bg-accent rounded-full" />
              </div>
            </div>

            {/* Projects count tile */}
            <div className="p-5 rounded-2xl border border-border bg-surface flex flex-col reveal">
              <div className="flex items-center justify-between mb-3">
                <span className="text-micro text-text-tertiary font-mono uppercase tracking-wider">Shipped</span>
                <FolderCode className="size-4 text-text-tertiary" />
              </div>
              <span className="text-[2.5rem] font-semibold text-text-primary leading-none tracking-tight">20+</span>
              <span className="text-caption text-text-secondary mt-1">projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIDE QUESTS ─── */}
      <section className="pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="section-label mb-10 md:mb-12 reveal">
          <span className="label-dot" />
          side quests
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.$id} className="reveal">
              <SmallProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section className="pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto text-center">
        <div className="reveal">
          <h2 className="text-display font-sans mb-4">
            Let's work together
          </h2>
          <p className="text-body text-text-secondary max-w-[400px] mx-auto mb-8">
            Got a project in mind? I'm always open to discussing new opportunities.
          </p>
          <a
            href="mailto:daftdevs@gmail.com"
            className="btn-primary"
          >
            Say hello
            <ArrowUpRight className="size-3.5 btn-icon" />
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto py-8 flex items-center justify-between">
          <span className="text-micro text-text-tertiary font-mono uppercase">
            &copy; {new Date().getFullYear()} daftdevs
          </span>
          <span className="font-pixel text-[6px] text-text-tertiary tracking-widest opacity-50 hover:opacity-100 hover:text-accent transition-all duration-300 cursor-default select-none">
            GG WP
          </span>
        </div>
      </footer>
    </main>
  );
}

/* ──────────────────────────────────────────────
   FEATURED PROJECT — large, editorial layout
   ────────────────────────────────────────────── */
function FeaturedProject({ project, index }: { project: Portfolio; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center`}>
      {/* Image — dominant */}
      <div className={`${isEven ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"}`}>
        <div className="project-image">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full aspect-[16/10] object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className={`${isEven ? "lg:col-span-5" : "lg:col-span-5 lg:order-1"} flex flex-col`}>
        <span className="font-pixel text-[7px] text-text-tertiary tracking-widest mb-4">
          #{String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-heading mb-3">{project.title}</h2>
        {project.description && (
          <p className="text-body text-text-secondary leading-relaxed mb-5">
            {project.description}
          </p>
        )}

        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-auto">
          {project.githubUrl && (
            <ProjectLink href={project.githubUrl} label="GitHub">
              <SiGithub className="size-[14px]" />
              <span>Code</span>
            </ProjectLink>
          )}
          {project.liveUrl && (
            <ProjectLink href={project.liveUrl} label="Live">
              <ExternalLink className="size-[14px]" />
              <span>Live</span>
            </ProjectLink>
          )}
          {project.googleUrl && (
            <ProjectLink href={project.googleUrl} label="Google Play">
              <SiGoogleplay className="size-[14px]" />
            </ProjectLink>
          )}
          {project.appleUrl && (
            <ProjectLink href={project.appleUrl} label="App Store">
              <SiAppstore className="size-[14px]" />
            </ProjectLink>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectLink({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="btn-ghost"
    >
      {children}
    </a>
  );
}

/* ──────────────────────────────────────────────
   EXPERIENCE ROW
   ────────────────────────────────────────────── */
function ExperienceRow({ exp, isLast }: { exp: Experience; isLast: boolean }) {
  return (
    <div className={`relative flex gap-5 ${!isLast ? "pb-8" : ""}`}>
      <div className="flex flex-col items-center pt-1.5">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${exp.current ? "bg-accent" : "bg-border"}`} />
        {!isLast && <div className="w-px flex-1 bg-border mt-2" />}
      </div>
      <div className="flex-1 -mt-0.5">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
          <h3 className="text-body font-semibold tracking-tight">{exp.role}</h3>
          <span className="text-micro text-text-tertiary font-mono uppercase whitespace-nowrap">
            {exp.period}
          </span>
        </div>
        <p className="text-caption text-accent font-medium mb-1.5">{exp.company}</p>
        <p className="text-caption text-text-secondary leading-relaxed">{exp.description}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SMALL PROJECT CARD
   ────────────────────────────────────────────── */
function SmallProjectCard({ project }: { project: Portfolio }) {
  return (
    <div className="group p-5 rounded-2xl border border-border bg-surface hover:border-text-tertiary/30 hover:bg-surface-raised/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-body font-medium tracking-tight group-hover:text-text-primary transition-colors">{project.title}</h3>
        <div className="flex items-center gap-0.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-7 h-7 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-raised transition-all duration-200 active:scale-90"
            >
              <Github className="size-[14px]" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live"
              className="flex items-center justify-center w-7 h-7 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-raised transition-all duration-200 active:scale-90"
            >
              <ExternalLink className="size-[14px]" />
            </a>
          )}
        </div>
      </div>
      {project.description && (
        <p className="text-caption text-text-tertiary leading-relaxed mb-4">{project.description}</p>
      )}
      {project.tags && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-micro text-text-tertiary font-mono">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   TECH LOADOUT
   ────────────────────────────────────────────── */
const stackGroups = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML & CSS", icon: SiHtml5 },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", icon: SiReact },
      { name: "React Native", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Expo", icon: SiExpo },
      { name: "Express", icon: SiExpress },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Firebase", icon: SiFirebase },
      { name: "MySQL", icon: SiMysql },
    ],
  },
];

function TechLoadout() {
  return (
    <div className="flex flex-col gap-5">
      {stackGroups.map((group) => (
        <div key={group.label}>
          <span className="text-micro text-text-tertiary font-mono uppercase mb-2.5 block">
            {group.label}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map(({ name, icon: Icon }) => (
              <span key={name} className="tag">
                <Icon className="size-3" />
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
