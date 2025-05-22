import CyberButton from "@/components/atoms/button/CyberButton";
import ThemeButton from "@/components/atoms/button/ThemeButton";
import SocialsCard from "@/components/organisms/card/SocialsCard";
import CharacterLevelStat from "@/components/organisms/character-stats/CharacterLevelStat";
import CharacterSkillsStat from "@/components/organisms/character-stats/CharacterSkillsStat";
import CardSlideshow from "@/components/organisms/slideshow/CardSlideshow";
import ProjectsSlideshow from "@/components/organisms/slideshow/ProjectSlideshow";
import { ChevronRight } from "lucide-react";

function App() {
  return (
    <main className="relative dark:text-dark-text-primary text-light-text-primary flex">
      <section className="container mx-auto p-8">
        {/* GRID PARENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-12 gap-4 min-h-screen p-4">
          {/* Left Section */}
          <div className="lg:col-span-3 lg:row-span-5 grid gap-4">
            <div className="lg:row-span-2 grid xl:grid-cols-3 rounded-lg gap-1">
              <div className="xl:col-span-1 relative overflow-hidden">
                <img
                  src="avatar.avif"
                  className="w-full h-full  rounded border-2 border-black"
                />
                <div className="shine-effect" />
              </div>
              <div className="xl:col-span-2 rpg-panel">
                <div className="flex flex-row items-center w-fit">
                  <ChevronRight />
                  <h1 className="animate-typing text-sm overflow-hidden whitespace-nowrap border-r-4 border-r-white font-bold">
                    Hello, World!
                  </h1>
                </div>
              </div>
            </div>

            <div className="lg:row-span-1 ">
              <CharacterLevelStat />
            </div>
            <div className="lg:row-span-1">
              <SocialsCard />
            </div>

            <div className="lg:row-span-1">
              <a
                href="https://drive.google.com/file/d/1SDemXlTIQkUY5bIe1vvqzO8aCo4nzdZ-/view"
                target="_blank"
              >
                <CyberButton title="DOWNLOAD MY RESUME" trademark="daft" />
              </a>
            </div>
          </div>

          {/* Center Section */}
          <div className="lg:col-span-6 lg:row-span-9 grid gap-4">
            <div className="lg:row-span-5  flex flex-col gap-2">
              <h1 className="text-xl font-bold">HIGHLIGHTS</h1>
              <CardSlideshow />
            </div>
            <div className="lg:row-span-2">
              <ProjectsSlideshow />
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-3 grid lg:row-span-5 gap-4">
            <div className="lg:row-span-4 bg-blue-400 rounded-lg">
              <CharacterSkillsStat />
            </div>
            {/* <div className="row-span-5 bg-red-400 rounded-lg">Right Box 2</div>
            <div className="row-span-3 bg-red-500 rounded-lg">Right Box 3</div>
            <div className="row-span-2 bg-red-600 rounded-lg">Right Box 4</div>
            <div className="row-span-2 bg-red-700 rounded-lg">Right Box 5</div> */}
          </div>
        </div>
      </section>
      <ThemeButton />
    </main>
  );
}

export default App;
