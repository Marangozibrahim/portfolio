import { createContext } from "react";
import type { Lang } from "../types";

export const STORAGE_KEY = "marangoz-lang";

export interface LangCtxValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

export const LangCtx = createContext<LangCtxValue | null>(null);
