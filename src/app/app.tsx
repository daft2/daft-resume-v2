import ThemeButton from "@/components/atoms/button/ThemeButton";
import ProfileCard from "@/components/organisms/profile/ProfileCard";
import TechStack from "@/components/organisms/tech-stack/TechStack";
import ProjectGrid from "@/components/organisms/projects/ProjectGrid";
import ProjectList from "@/components/organisms/projects/ProjectList";

function App() {
  return (
    <main className="relative min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10 md:mb-14 opacity-0 animate-fade-up">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] md:text-xs text-accent tracking-wider">
              DAFFA.DEV
            </span>
            <span className="text-text-tertiary text-xs font-mono">/</span>
            <span className="text-text-secondary text-sm">portfolio</span>
          </div>
          <ThemeButton />
        </header>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Left — Profile + Stack */}
          <div className="lg:col-span-3 flex flex-col gap-5 md:gap-6">
            <div className="opacity-0 animate-fade-up stagger-1">
              <ProfileCard />
            </div>
            <div className="opacity-0 animate-fade-up stagger-3">
              <TechStack />
            </div>
          </div>

          {/* Center — Projects */}
          <div className="lg:col-span-9 flex flex-col gap-5 md:gap-6">
            <div className="opacity-0 animate-fade-up stagger-2">
              <div className="section-label mb-4">
                <span className="label-dot" />
                quest log
              </div>
              <ProjectGrid />
            </div>

            <div className="opacity-0 animate-fade-up stagger-4">
              <div className="section-label mb-4">
                <span className="label-dot" />
                inventory
              </div>
              <ProjectList />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14 md:mt-20 opacity-0 animate-fade-up stagger-6">
          <div className="flex items-center justify-between py-6 border-t border-border">
            <span className="text-text-tertiary text-xs font-mono">
              &copy; {new Date().getFullYear()} daffa.dev
            </span>
            <span className="font-pixel text-[6px] text-text-tertiary tracking-widest opacity-60 hover:opacity-100 transition-opacity cursor-default">
              GG WP
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
