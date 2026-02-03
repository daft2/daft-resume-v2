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

type StackGroup = {
  label: string;
  items: { name: string; icon: React.ElementType }[];
};

const stack: StackGroup[] = [
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

const TechStack = () => {
  return (
    <div className="card p-5 md:p-6">
      <div className="section-label mb-4">
        <span className="label-dot" />
        loadout
      </div>

      <div className="flex flex-col gap-4">
        {stack.map((group) => (
          <div key={group.label}>
            <span className="text-text-tertiary text-xs font-medium mb-2 block">
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
    </div>
  );
};

export default TechStack;
