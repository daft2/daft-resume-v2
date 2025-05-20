import { ReactNode } from "react";

const RPGPanel = ({ children }: { children?: ReactNode }) => {
  return <div className="rpg-panel">{children}</div>;
};

export default RPGPanel;
