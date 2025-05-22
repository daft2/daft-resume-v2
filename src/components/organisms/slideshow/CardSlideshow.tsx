import { useState, useRef } from "react";
import { Diamond, Film, Filter } from "lucide-react";

const slides = [
  {
    id: "tinkerlust",
    title: "TINKERLUST",
    content:
      "Tinkerlust is a fashion marketplace app where users can buy and sell pre-loved luxury fashion items. It offers a range of designer clothes, shoes, bags, and accessories at affordable prices.",
    icon: <Diamond className="w-5 h-5" />,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/d2/2b/5c/d22b5ca6-3030-5922-473d-9ebc115fff33/c8f45bfa-09c7-4d20-b5d2-886b146d05c8_Artboard_3.png/626x0w.webp",
  },
  {
    id: "grlpa",
    title: "GRL@PA",
    content:
      "GRL@PA is the one-stop app for Grassroots Volunteers to access services, information and learning opportunities such as: Manage profile information, view current and past service records, display eID Card, stay up to date with upcoming activities and task.",
    icon: <Film className="w-5 h-5" />,
    image:
      "https://play-lh.googleusercontent.com/GXm18ghBvPLp7ePQunoX4J4PPsxoXWi6MPg2FcHEla21fNlL0BnuYFTMbxVO0fgLOw=w5120-h2880-rw",
  },
  {
    id: "svg-filters",
    title: "SVG FILTERS",
    content: "Learn how to create stunning visual effects with SVG filters.",
    icon: <Filter className="w-5 h-5" />,
    image: "/placeholder.svg?height=600&width=800",
  },
];

export default function CardSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full flex overflow-hidden" ref={containerRef}>
      <div className="flex w-full gap-1 md:gap-2 flex-col lg:flex-row">
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
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
  slide: (typeof slides)[0];
  isActive: boolean;
  onClick: () => void;
}

function Slide({ slide, isActive, onClick }: SlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={slideRef}
      onClick={onClick}
      className={`relative h-96 rounded-xl overflow-hidden w-full cursor-pointer border border-white/20 transition-all duration-700 ease-in-out ${
        isActive ? "flex-1 z-50 flex-grow flex-shrink-0" : ""
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
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
        }}
      />

      <div
        className={`absolute inset-0 transition-all duration-200 ${
          isActive ? "bg-black/50" : "bg-black/50"
        }`}
      />

      <div className="relative z-10 bg-black/10 h-full">
        {isActive ? (
          <div className="h-full flex flex-col justify-between p-6 opacity-0 animate-slide-content">
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-2xl font-bold">{slide.title}</h2>
              <p className="text-white/90 text-lg">{slide.content}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button className="flex items-center gap-2 text-white bg-transparent hover:bg-white/10 transition-colors px-3 py-2 rounded-md w-fit">
                <span className="text-white/90">Watch now</span>
              </button>
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
