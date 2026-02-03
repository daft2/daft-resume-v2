import { Swords } from "lucide-react";
import { useState } from "react";
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

const proficiencyValue: Record<ProficiencyLevel, number> = {
  [ProficiencyLevel.Beginner]: 25,
  [ProficiencyLevel.Intermediate]: 50,
  [ProficiencyLevel.Advanced]: 75,
  [ProficiencyLevel.Expert]: 95,
};

const proficiencyColor: Record<ProficiencyLevel, string> = {
  [ProficiencyLevel.Beginner]: "#A0A0A0",
  [ProficiencyLevel.Intermediate]: "#3B82F6",
  [ProficiencyLevel.Advanced]: "#9D00FF",
  [ProficiencyLevel.Expert]: "#FFD700",
};

type Skill = {
  title: string;
  proficiency: ProficiencyLevel;
  icon: React.ElementType;
};

const skills: Skill[] = [
  { title: "React", proficiency: ProficiencyLevel.Advanced, icon: SiReact },
  { title: "React Native", proficiency: ProficiencyLevel.Advanced, icon: SiReact },
  { title: "Expo", proficiency: ProficiencyLevel.Intermediate, icon: SiExpo },
  { title: "NextJS", proficiency: ProficiencyLevel.Intermediate, icon: SiNextdotjs },
  { title: "Express", proficiency: ProficiencyLevel.Intermediate, icon: SiExpress },
  { title: "NodeJS", proficiency: ProficiencyLevel.Advanced, icon: SiNodedotjs },
  { title: "HTML & CSS", proficiency: ProficiencyLevel.Expert, icon: SiHtml5 },
  { title: "Typescript", proficiency: ProficiencyLevel.Advanced, icon: SiTypescript },
  { title: "Javascript", proficiency: ProficiencyLevel.Advanced, icon: SiJavascript },
  { title: "MySQL", proficiency: ProficiencyLevel.Advanced, icon: SiMysql },
  { title: "Firebase", proficiency: ProficiencyLevel.Advanced, icon: SiFirebase },
];

const CharacterSkillsStat = () => {
  const [showYOE, setShowYOE] = useState(false);

  return (
    <div className="rpg-panel h-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="rpg-header">
          <Swords className="size-4 text-arcade-magenta" />
          <span className="font-pixel text-[8px] xl:text-[9px] tracking-wider">
            {showYOE ? "EXPERIENCE" : "SKILL TREE"}
          </span>
        </div>
        <label className="flex items-center cursor-pointer select-none gap-2">
          <span className="font-pixel text-[6px] text-dark-text-secondary tracking-wider">
            YOE
          </span>
          <span className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showYOE}
              onChange={() => setShowYOE((prev) => !prev)}
            />
            <div className="w-7 h-3.5 bg-dark-border dark:bg-dark-border rounded-sm border border-arcade-magenta/30 transition-colors duration-200 peer-checked:bg-arcade-magenta/20 peer-checked:border-arcade-green/30" />
            <div className="absolute left-0.5 top-0.5 w-2.5 h-2.5 bg-arcade-magenta rounded-sm shadow transition-transform duration-200 peer-checked:translate-x-3.5 peer-checked:bg-arcade-green" />
          </span>
        </label>
      </div>

      {/* Skills Grid */}
      <div className="flex flex-col gap-2.5 mt-1">
        {skills.map(({ title, proficiency, icon: Icon }, idx) => (
          <div key={title + idx} className="flex items-center gap-2.5">
            <Icon
              className="size-4 shrink-0"
              style={{ color: proficiencyColor[proficiency] }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono text-[10px] truncate">{title}</span>
                <span
                  className="font-pixel text-[6px] tracking-wider shrink-0 ml-2"
                  style={{ color: proficiencyColor[proficiency] }}
                >
                  {showYOE ? proficiencyYearRange[proficiency] : proficiency.toUpperCase()}
                </span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar__fill"
                  style={{
                    width: `${proficiencyValue[proficiency]}%`,
                    background: proficiencyColor[proficiency],
                    boxShadow: `0 0 6px ${proficiencyColor[proficiency]}44`,
                  }}
                />
                <div className="stat-bar__ticks">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="stat-bar__tick" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pixel-divider mt-auto" />
      <div className="flex items-center justify-between">
        <span className="font-pixel text-[6px] text-dark-text-secondary tracking-wider">
          {skills.length} SKILLS EQUIPPED
        </span>
        <span className="font-mono text-[10px] text-arcade-cyan/60">
          ...and more
        </span>
      </div>
    </div>
  );
};

export default CharacterSkillsStat;
