import { ReactNode } from "react";

const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div
      className="relative group z-20 w-fit flex"
      aria-describedby="tooltip-id"
    >
      {children}
      <div
        role="tooltip"
        id="tooltip-id"
        className="pixel-tooltip absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
