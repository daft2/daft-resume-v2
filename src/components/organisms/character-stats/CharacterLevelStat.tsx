import React from "react";

const CharacterLevelStat = () => {
  const birthDate = new Date("1999-08-28");
  const now = new Date();

  // Current age
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

  // Last birthday
  const lastBirthday =
    now >= birthdayThisYear
      ? birthdayThisYear
      : new Date(thisYear - 1, birthDate.getMonth(), birthDate.getDate());

  // Next birthday
  const nextBirthday =
    now >= birthdayThisYear
      ? new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate())
      : birthdayThisYear;

  // Time calculations
  const elapsed = now.getTime() - lastBirthday.getTime();
  const total = nextBirthday.getTime() - lastBirthday.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100)).toFixed(
    2
  );

  return (
    <div className="rpg-panel flex flex-col justify-center items-center gap-2">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col items-center">
            <h2 className="text-xs">LEVEL</h2>
            <h1 className="text-xl font-bold -m-1">{age}</h1>
          </div>
          <h2 className="text-md font-sans font-bold uppercase tracking-wider">
            MUHAMMAD DAFFA SETYOAJI
          </h2>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">XP Obtained</span>
            <span className="text-xs font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-[#181c20] border border-[#23272e] rounded h-3 overflow-hidden relative shadow-inner">
            <div
              className="h-3 transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #FFE600 0%, #bfae00 100%)",
                boxShadow: "0 0 8px 1px #FFE60033 inset",
                borderRight:
                  progress === "100.00" ? "none" : "2px solid #FFE600",
              }}
            />
            <div className="absolute inset-0 pointer-events-none flex">
              {/* Tick marks for RPG style */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full border-r border-[#FFE600] opacity-20"
                  style={{ width: "10%" }}
                />
              ))}
            </div>
            <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
              {/* Subtle shine overlay */}
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.10) 100%)",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterLevelStat;
