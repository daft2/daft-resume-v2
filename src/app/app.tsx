import CyberButton from "@/components/atoms/button/CyberButton";
import ThemeButton from "@/components/atoms/button/ThemeButton";
import SocialsCard from "@/components/organisms/card/SocialsCard";
import CharacterLevelStat from "@/components/organisms/character-stats/CharacterLevelStat";
import CharacterSkillsStat from "@/components/organisms/character-stats/CharacterSkillsStat";
import CardSlideshow from "@/components/organisms/slideshow/CardSlideshow";
import ProjectsSlideshow from "@/components/organisms/slideshow/ProjectSlideshow";
import { ChevronRight, Gamepad2 } from "lucide-react";

function App() {
  return (
    <main className="relative dark:text-dark-text-primary text-light-text-primary flex min-h-screen">
      <section className="container mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        {/* GAME TITLE BAR */}
        <div className="flex items-center gap-3 mb-6 opacity-0 animate-float-up">
          <Gamepad2 className="size-5 text-arcade-cyan" />
          <h1 className="font-pixel text-[10px] md:text-xs tracking-wider text-arcade-cyan">
            DAFFA.DEV
          </h1>
          <div className="flex-1 pixel-divider" />
          <span className="font-pixel text-[8px] text-dark-text-secondary dark:text-dark-text-secondary">
            v2.0
          </span>
        </div>

        {/* GRID PARENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
          {/* Left Section — Character Info */}
          <div className="lg:col-span-3 flex flex-col gap-3 md:gap-4">
            {/* Avatar + Greeting */}
            <div className="grid xl:grid-cols-3 gap-3 opacity-0 animate-float-up stagger-1">
              <div className="xl:col-span-1 relative overflow-hidden rounded-sm border-2 border-arcade-cyan/30 dark:border-arcade-cyan/30 shadow-glow-cyan">
                <img
                  src="avatar.avif"
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
                <div className="shine-effect" />
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-arcade-cyan" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-arcade-cyan" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-arcade-cyan" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-arcade-cyan" />
              </div>
              <div className="xl:col-span-2 rpg-panel flex items-center">
                <div className="flex flex-row items-center gap-2">
                  <ChevronRight className="size-4 text-arcade-cyan animate-pixel-pulse" />
                  <h1 className="animate-typing text-xs font-mono overflow-hidden whitespace-nowrap border-r-2 border-r-arcade-cyan font-medium tracking-wide">
                    Hello, World!
                  </h1>
                </div>
              </div>
            </div>

            {/* Character Level */}
            <div className="opacity-0 animate-float-up stagger-2">
              <CharacterLevelStat />
            </div>

            {/* Socials */}
            <div className="opacity-0 animate-float-up stagger-3">
              <SocialsCard />
            </div>

            {/* Resume Download */}
            <div className="opacity-0 animate-float-up stagger-4">
              <a
                href="https://drive.google.com/file/d/1SDemXlTIQkUY5bIe1vvqzO8aCo4nzdZ-/view"
                target="_blank"
              >
                <CyberButton title="DOWNLOAD RESUME" trademark="daft" />
              </a>
            </div>
          </div>

          {/* Center Section — Quest Log / Highlights */}
          <div className="lg:col-span-6 flex flex-col gap-3 md:gap-4">
            {/* Highlights */}
            <div className="flex flex-col gap-2 opacity-0 animate-float-up stagger-2">
              <div className="rpg-header mb-2">
                <span className="font-pixel text-[10px] md:text-xs text-arcade-cyan tracking-wider">
                  QUEST LOG
                </span>
                <span className="font-mono text-[10px] text-dark-text-secondary">
                  // highlighted projects
                </span>
              </div>
              <CardSlideshow />
            </div>

            {/* Portfolio */}
            <div className="opacity-0 animate-float-up stagger-4">
              <ProjectsSlideshow />
            </div>
          </div>

          {/* Right Section — Skills / Stats */}
          <div className="lg:col-span-3 flex flex-col gap-3 md:gap-4">
            <div className="opacity-0 animate-float-up stagger-3">
              <CharacterSkillsStat />
            </div>
          </div>
        </div>

        {/* FOOTER BAR */}
        <div className="flex items-center gap-3 mt-6 opacity-0 animate-float-up stagger-6">
          <div className="flex-1 pixel-divider" />
          <span className="font-pixel text-[7px] text-dark-text-secondary tracking-wider">
            PRESS START TO CONTINUE
          </span>
          <div className="flex-1 pixel-divider" />
        </div>
      </section>

      <ThemeButton />
    </main>
  );
}

export default App;
