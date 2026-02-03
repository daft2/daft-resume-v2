import { useState, useRef, useEffect, ReactNode } from "react";
import { getHighlighted, Portfolio } from "@/lib/portfolio";
import {
  SiAppstore,
  SiGithub,
  SiGoogleplay,
} from "@icons-pack/react-simple-icons";
import { SquareArrowOutUpRight, Star } from "lucide-react";

export default function CardSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Portfolio[]>();

  useEffect(() => {
    getHighlighted()
      .then(({ documents }) => setData(documents as Portfolio[]))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="relative w-full flex overflow-hidden" ref={containerRef}>
      <div className="flex w-full gap-1.5 md:gap-2 flex-col lg:flex-row">
        {data?.map((slide, index) => (
          <Slide
            key={slide.$id}
            slide={slide}
            index={index}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface SlideProps {
  slide: Portfolio;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function Slide({ slide, index, isActive, onClick }: SlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={slideRef}
      onClick={onClick}
      className={`relative h-80 lg:h-96 overflow-hidden w-full border transition-all duration-700 ease-in-out rounded-sm ${
        isActive
          ? "flex-1 z-50 flex-grow flex-shrink-0 border-arcade-cyan/30 shadow-glow-cyan"
          : "hover:border-arcade-cyan/20 cursor-pointer border-dark-border dark:border-dark-border"
      }`}
      style={{
        transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
        flexBasis: isActive ? "0%" : "80px",
      }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isActive ? "opacity-100" : "opacity-30"
        }`}
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundSize: "cover",
        }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
            : "bg-black/80"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {isActive ? (
          <div className="h-full flex flex-col justify-between p-5 opacity-0 animate-slide-content">
            <div className="flex flex-col gap-3">
              {/* Quest number badge */}
              <div className="flex items-center gap-2">
                <Star className="size-3 text-arcade-gold fill-arcade-gold" />
                <span className="font-pixel text-[7px] text-arcade-gold tracking-widest">
                  QUEST #{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-silk text-lg md:text-xl text-white tracking-wide">
                {slide.title}
              </h2>
              <p className="font-mono text-sm text-white/70 leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-row gap-1.5">
              {slide.googleUrl && (
                <ActionButton href={slide.googleUrl}>
                  <SiGoogleplay className="size-4" />
                </ActionButton>
              )}
              {slide.appleUrl && (
                <ActionButton href={slide.appleUrl}>
                  <SiAppstore className="size-4" />
                </ActionButton>
              )}
              {slide.githubUrl && (
                <ActionButton href={slide.githubUrl}>
                  <SiGithub className="size-4" />
                </ActionButton>
              )}
              {slide.liveUrl && (
                <ActionButton href={slide.liveUrl}>
                  <SquareArrowOutUpRight className="size-4" />
                </ActionButton>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="lg:rotate-180 whitespace-nowrap">
              <h3 className="font-pixel text-[8px] text-white/60 tracking-widest lg:vertical-text">
                {slide.title.toUpperCase()}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ActionButton = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => (
  <a
    target="_blank"
    href={href}
    className="flex items-center justify-center text-arcade-cyan/80 bg-dark-surface/60 hover:bg-arcade-cyan/10 border border-arcade-cyan/20 hover:border-arcade-cyan/40 transition-all px-3 py-2 rounded-sm hover:shadow-glow-cyan"
  >
    {children}
  </a>
);
