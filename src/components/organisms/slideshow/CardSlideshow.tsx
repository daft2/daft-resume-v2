import { useState, useRef, useEffect, ReactNode } from "react";
import { getHighlighted, Portfolio } from "@/lib/appwrite";
import {
  SiAppstore,
  SiGithub,
  SiGoogleplay,
} from "@icons-pack/react-simple-icons";
import { SquareArrowOutUpRight } from "lucide-react";

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
      <div className="flex w-full gap-1 md:gap-2 flex-col lg:flex-row">
        {data?.map((slide, index) => (
          <Slide
            key={slide.$id}
            slide={slide}
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
  isActive: boolean;
  onClick: () => void;
}

function Slide({ slide, isActive, onClick }: SlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={slideRef}
      onClick={onClick}
      className={`relative h-96 rounded-xl overflow-hidden w-full border border-white/20  transition-all duration-700 ease-in-out ${
        isActive
          ? "flex-1 z-50 flex-grow flex-shrink-0"
          : "hover:border-white/50 cursor-pointer"
      }`}
      style={{
        transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
        flexBasis: isActive ? "0%" : "80px",
      }}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isActive ? "opacity-100" : "opacity-50"
        }`}
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundSize: "cover",
        }}
      />

      <div
        className={`absolute inset-0 transition-all duration-200 ${
          isActive ? "bg-black/50" : "bg-black/80"
        }`}
      />

      <div className="relative z-10 bg-black/10 h-full">
        {isActive ? (
          <div className="h-full flex flex-col justify-between p-6 opacity-0 animate-slide-content">
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-2xl font-bold">{slide.title}</h2>
              <p className="text-white/90 text-lg">{slide.description}</p>
            </div>

            <div className="flex flex-row gap-1">
              {slide.googleUrl && (
                <Button href={slide.googleUrl}>
                  <SiGoogleplay />
                </Button>
              )}
              {slide.appleUrl && (
                <Button href={slide.appleUrl}>
                  <SiAppstore />
                </Button>
              )}
              {slide.githubUrl && (
                <Button href={slide.githubUrl}>
                  <SiGithub />
                </Button>
              )}
              {slide.liveUrl && (
                <Button href={slide.liveUrl}>
                  <SquareArrowOutUpRight />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="flex items-center justify-center h-full">
              <div className="lg:rotate-180 whitespace-nowrap">
                <h3 className="text-white text-lg font-bold tracking-wider lg:vertical-text">
                  {slide.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Button = ({ children, href }: { children: ReactNode; href: string }) => (
  <button className="flex items-center gap-2 text-white bg-transparent hover:bg-white/10 transition-colors px-3 py-2 rounded-md w-fit">
    <a target="_blank" href={href} className="text-white/90">
      {children}
    </a>
  </button>
);
