import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import {
  SiExpo,
  SiExpress,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

enum ProficiencyLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}

const proficiencyYearRange: Record<ProficiencyLevel, string> = {
  [ProficiencyLevel.Beginner]: "0-1 yr",
  [ProficiencyLevel.Intermediate]: "1-3 yrs",
  [ProficiencyLevel.Advanced]: "3-5 yrs",
  [ProficiencyLevel.Expert]: "5+ yrs",
};

type Skill = {
  title: string;
  proficiency: ProficiencyLevel;
  icon: React.ElementType;
};

const skills: Skill[] = [
  {
    title: "React",
    proficiency: ProficiencyLevel.Advanced,
    icon: SiReact,
  },
  {
    title: "React Native",
    proficiency: ProficiencyLevel.Advanced,
    icon: SiReact,
  },
  {
    title: "Expo",
    proficiency: ProficiencyLevel.Intermediate,
    icon: SiExpo,
  },
  {
    title: "NextJS",
    proficiency: ProficiencyLevel.Intermediate,
    icon: SiNextdotjs,
  },
  {
    title: "Express",
    proficiency: ProficiencyLevel.Intermediate,
    icon: SiExpress,
  },
  {
    title: "NodeJS",
    proficiency: ProficiencyLevel.Advanced,
    icon: SiNodedotjs,
  },
  {
    title: "HTML & CSS",
    proficiency: ProficiencyLevel.Expert,
    icon: SiHtml5,
  },
  {
    title: "Typescript",
    proficiency: ProficiencyLevel.Advanced,
    icon: SiTypescript,
  },
  {
    title: "Javascript",
    proficiency: ProficiencyLevel.Advanced,
    icon: SiJavascript,
  },
  {
    title: "MySQL",
    proficiency: ProficiencyLevel.Advanced,
    icon: SiMysql,
  },
  {
    title: "Firebase",
    proficiency: ProficiencyLevel.Advanced,
    icon: SiFirebase,
  },
];

const CharacterSkillsStat = () => {
  const [showYOE, setShowYOE] = useState(false);

  return (
    <div className="rpg-panel h-full flex flex-col justify-center gap-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          <h1 className="text-sm font-bold">
            {showYOE ? "YEARS OF EXPERIENCE" : "SKILLS MASTERY"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center cursor-pointer select-none">
            <span className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showYOE}
                onChange={() => setShowYOE((prev) => !prev)}
              />
              <div className="w-10 h-5 bg-gradient-to-br from-yellow-900 via-yellow-700 to-yellow-500 border-2 border-yellow-800 rounded-full shadow-inner transition-colors duration-200 peer-checked:bg-gradient-to-br peer-checked:from-green-900 peer-checked:via-green-700 peer-checked:to-green-500 peer-checked:border-green-800" />
              <div className="absolute left-0 top-0 w-5 h-5 bg-gradient-to-br from-yellow-300 via-yellow-100 to-yellow-400 border-2 border-yellow-600 peer-checked:border-green-500 peer-checked:from-green-300 peer-checked:to-green-400 peer-checked:via-green-100 rounded-full shadow peer-checked:translate-x-5 transition-transform duration-200" />
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4">
        {skills.map(({ title, proficiency, icon: Icon }, idx) => (
          <div className="col-span-1" key={title + idx}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Icon className="size-6" />
              <div className="text-xs font-bold">{title}</div>
              <div className="text-xs text-rpg-text-muted">
                {showYOE ? proficiencyYearRange[proficiency] : proficiency}
              </div>
            </div>
          </div>
        ))}

        <div className="col-span-1">
          <div className="flex items-end h-full justify-end">
            <p className="text-xs text-center">...and more</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSkillsStat;
