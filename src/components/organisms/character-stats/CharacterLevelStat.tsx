import { Shield } from "lucide-react";

const CharacterLevelStat = () => {
  const birthDate = new Date("1999-08-28");
  const now = new Date();

  const thisYear = now.getFullYear();
  const birthdayThisYear = new Date(
    thisYear,
    birthDate.getMonth(),
    birthDate.getDate()
  );

  let age = thisYear - birthDate.getFullYear();
  if (now < birthdayThisYear) {
    age -= 1;
  }

  const lastBirthday =
    now >= birthdayThisYear
      ? birthdayThisYear
      : new Date(thisYear - 1, birthDate.getMonth(), birthDate.getDate());

  const nextBirthday =
    now >= birthdayThisYear
      ? new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate())
      : birthdayThisYear;

  const elapsed = now.getTime() - lastBirthday.getTime();
  const total = nextBirthday.getTime() - lastBirthday.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100)).toFixed(
    2
  );

  return (
    <div className="rpg-panel h-full flex flex-col gap-3">
      {/* Name + Level row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center justify-center w-10 h-10 border border-arcade-xp/40 rounded-sm bg-arcade-xp/5">
            <span className="font-pixel text-[7px] text-arcade-xp/70 leading-none">
              LV
            </span>
            <span className="font-pixel text-sm text-arcade-xp leading-none">
              {age}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-pixel text-[7px] xl:text-[8px] tracking-wider leading-relaxed">
              MUHAMMAD DAFFA
            </h2>
            <span className="font-mono text-[10px] text-dark-text-secondary dark:text-dark-text-secondary">
              Software Engineer
            </span>
          </div>
        </div>
        <Shield className="size-4 text-arcade-cyan/40" />
      </div>

      {/* XP Bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-pixel text-[7px] text-arcade-xp/80 tracking-wider">
            XP
          </span>
          <span className="font-mono text-[10px] text-dark-text-secondary">
            {progress}%
          </span>
        </div>
        <div className="stat-bar">
          <div
            className="stat-bar__fill"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #EAB308 0%, #CA8A04 100%)",
              boxShadow: "0 0 8px 1px #EAB30833",
            }}
          />
          <div className="stat-bar__ticks">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="stat-bar__tick" />
            ))}
          </div>
        </div>
      </div>

      {/* Mini stat row */}
      <div className="flex gap-2 pt-1">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-arcade-hp" />
          <span className="font-pixel text-[6px] text-dark-text-secondary tracking-wider">
            HP 100%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-arcade-mp" />
          <span className="font-pixel text-[6px] text-dark-text-secondary tracking-wider">
            MP 100%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterLevelStat;
