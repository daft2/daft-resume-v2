import { useEffect, useState } from "react";
import ThemeButton from "@/components/atoms/button/ThemeButton";
import {
  getHighlighted,
  getPortfolio,
  getExperience,
  Portfolio,
  Experience,
} from "@/lib/portfolio";
import { useReveal } from "@/lib/useReveal";
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

  const heroRef = useReveal();
  const projectsRef = useReveal();
  const bentoRef = useReveal();
  const otherRef = useReveal();
  const footerRef = useReveal();

  useEffect(() => {
    getHighlighted().then(({ documents }) => setHighlighted(documents as Portfolio[]));
    getPortfolio().then(({ documents }) => setProjects(documents as Portfolio[]));
    getExperience().then(({ documents }) => setExperience(documents));
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/80 border-b border-border/50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="#" className="font-pixel text-[8px] text-accent tracking-wider hover:opacity-80 transition-opacity">
            DAFFA.DEV
          </a>
          <div className="flex items-center gap-6">
            <a href="#work" className="text-caption text-text-tertiary hover:text-text-primary transition-colors">Work</a>
            <a href="#about" className="text-caption text-text-tertiary hover:text-text-primary transition-colors hidden sm:block">About</a>
            <a href="mailto:daftdevs@gmail.com" className="text-caption text-text-tertiary hover:text-text-primary transition-colors">Contact</a>
            <ThemeButton />
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="pt-32 md:pt-44 pb-20 md:pb-32 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="reveal delay-1">
          <p className="section-label mb-6">
            <span className="label-dot" />
            available for work
          </p>
        </div>
        <h1 className="reveal delay-2 text-display-xl font-sans max-w-[900px]">
          Muhammad Daffa{" "}
          <span className="text-text-tertiary">builds products</span>{" "}
          <span className="font-serif italic font-light text-text-secondary">people actually use</span>
        </h1>
        <div className="reveal delay-3 mt-8 md:mt-10">
          <p className="text-body-lg text-text-secondary max-w-[520px]">
            Software engineer focused on mobile & web. Turning complex problems into clean, intuitive experiences.
          </p>
        </div>
        <div className="reveal delay-4 mt-8 flex flex-wrap items-center gap-3">
          <a
            href="mailto:daftdevs@gmail.com"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-text-primary text-bg rounded-full text-caption font-medium hover:opacity-85 active:scale-[0.97] transition-all duration-200"
          >
            Get in touch
            <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href="https://drive.google.com/file/d/1SDemXlTIQkUY5bIe1vvqzO8aCo4nzdZ-/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border text-caption font-medium text-text-secondary hover:text-text-primary hover:border-text-tertiary transition-all duration-200"
          >
            <Download className="size-3.5" />
            Resume
          </a>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section id="work" ref={projectsRef} className="pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="reveal">
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="section-label">
              <span className="label-dot" />
              quest log
            </div>
            <span className="text-micro text-text-tertiary font-mono uppercase">
              {highlighted.length} featured
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {highlighted.map((project, i) => (
            <div key={project.$id} className="reveal" style={{ animationDelay: `${i * 0.12}s` }}>
              <FeaturedProject project={project} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENTO GRID — About / Experience / Stack / Personality ─── */}
      <section id="about" ref={bentoRef} className="pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="reveal">
          <div className="section-label mb-12 md:mb-16">
            <span className="label-dot" />
            character sheet
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* Profile — spans 5 cols */}
          <div className="reveal delay-1 lg:col-span-5 p-6 md:p-8 rounded-2xl border border-border bg-surface">
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
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-tertiary hover:text-text-primary hover:border-text-tertiary transition-all duration-300"
                >
                  <Icon className="size-[15px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Tech Loadout — spans 7 cols */}
          <div className="reveal delay-2 lg:col-span-7 p-6 md:p-8 rounded-2xl border border-border bg-surface">
            <div className="section-label mb-6">
              <span className="label-dot" />
              loadout
            </div>
            <TechLoadout />
          </div>

          {/* Experience timeline — spans 7 cols */}
          <div className="reveal delay-3 lg:col-span-7 p-6 md:p-8 rounded-2xl border border-border bg-surface">
            <div className="section-label mb-6">
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
          <div className="reveal delay-4 lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Hobbies tile */}
            <div className="col-span-2 p-6 rounded-2xl border border-border bg-surface">
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

            {/* Stats tile */}
            <div className="p-6 rounded-2xl border border-border bg-surface flex flex-col justify-between">
              <span className="text-micro text-text-tertiary font-mono uppercase">Years exp</span>
              <span className="text-display font-sans text-text-primary mt-2">4+</span>
            </div>

            {/* Projects count tile */}
            <div className="p-6 rounded-2xl border border-border bg-surface flex flex-col justify-between">
              <span className="text-micro text-text-tertiary font-mono uppercase">Projects</span>
              <span className="text-display font-sans text-text-primary mt-2">20+</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIDE QUESTS ─── */}
      <section ref={otherRef} className="pb-24 md:pb-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="reveal">
          <div className="section-label mb-10 md:mb-12">
            <span className="label-dot" />
            side quests
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div key={project.$id} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
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
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-text-primary text-bg rounded-full text-caption font-medium hover:opacity-85 active:scale-[0.97] transition-all duration-200"
          >
            Say hello
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer ref={footerRef} className="border-t border-border px-6 md:px-10">
        <div className="reveal max-w-[1200px] mx-auto py-8 flex items-center justify-between">
          <span className="text-micro text-text-tertiary font-mono uppercase">
            &copy; {new Date().getFullYear()} daffa.dev
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
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border text-caption text-text-secondary hover:text-text-primary hover:border-text-tertiary transition-all duration-300"
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
    <div className="group p-5 rounded-2xl border border-border bg-surface hover:border-text-tertiary/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-body font-medium tracking-tight">{project.title}</h3>
        <div className="flex items-center gap-1">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-tertiary hover:text-text-primary transition-colors p-1">
              <Github className="size-[14px]" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-text-tertiary hover:text-text-primary transition-colors p-1">
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
