import ThemeButton from "@/components/atoms/button/ThemeButton";
import SocialsCard from "@/components/organisms/card/SocialsCard";
import CharacterLevelStat from "@/components/organisms/character-stats/CharacterLevelStat";
import CharacterSkillsStat from "@/components/organisms/character-stats/CharacterSkillsStat";
import ProjectsSlideshow from "@/components/organisms/slideshow/ProjectSlideshow";

function App() {
  return (
    <main className="dark:darkMode lightMode relative dark:text-dark-text-primary text-light-text-primary flex">
      <section className="container mx-auto p-8">
        {/* GRID PARENTS */}
        <div className="grid grid-cols-12 gap-4 min-h-screen p-4">
          {/* Left Section */}
          <div className="col-span-3 grid grid-rows-12 gap-4">
            <div className="row-span-2 bg-blue-300 rounded-lg">
              <CharacterLevelStat />
            </div>
            <div className="row-span-4 bg-blue-400 rounded-lg">
              <CharacterSkillsStat />
            </div>
            {/* <div className="row-span-3 bg-blue-500 rounded-lg">
              <CharacterLevelStat />
            </div> */}
          </div>

          {/* Center Section */}
          <div className="col-span-6 grid grid-rows-12 gap-4">
            <div className="row-span-6 grid gap-4 rounded-lg">
              <div className="row-span-3">
                <ProjectsSlideshow />
              </div>
              <div className="row-span-3">
                <ProjectsSlideshow />
              </div>
            </div>
            {/* <div className="row-span-4 bg-green-500 rounded-lg">
              <ProjectsSlideshow />
            </div> */}
          </div>

          {/* Right Section */}
          <div className="col-span-3 grid grid-rows-12 gap-4">
            <div className="row-span-1 bg-red-300 rounded-lg">
              <SocialsCard />
            </div>
            <div className="row-span-1">
              <div className="flex relative overflow-hidden rounded items-center justify-center bg-gradient- p-2">
                <h1 className="text-xl">DOWNLOAD MY RESUME</h1>
                <div className="shine-effect"></div>
              </div>
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
