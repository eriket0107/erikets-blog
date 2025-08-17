import { ReactNode } from "react";
import style from "./style.module.css";

export const BorderAnimated = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.card}>
      <div className="bg-background p-2">{children}</div>
    </div>
  );
};
