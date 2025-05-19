import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import ThemeButton from "components/atoms/button/ThemeButton";
import CharacterLevelStat from "components/organisms/character-stats/CharacterLevelStat";

function App() {
  return (
    <main className="dark:darkMode lightMode relative dark:text-dark-text-primary text-light-text-primary flex">
      <section className="container mx-auto p-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3 flex flex-col gap-2">
            <CharacterLevelStat />
            <div className="rpg-panel flex flex-col justify-center  gap-2">
              <div className="flex gap-2 items-center mb-2">
                <AdjustmentsHorizontalIcon className="size-4" />
                <h1 className="text-sm font-bold">SKILLS</h1>
              </div>
            </div>
            {/* <div className="max-h-80">
              <img
                src="/avatar.avif"
                alt="Avatar"
                className="w-full h-full border rounded"
              />
            </div> */}
          </div>
          <div className="lg:col-span-6 h-40 bg-black"></div>
          <div className="lg:col-span-3  h-40 bg-black"></div>
        </div>
      </section>
      <ThemeButton />
    </main>
  );
}

export default App;
