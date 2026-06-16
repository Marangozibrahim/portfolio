import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "../types";
import { LangCtx, STORAGE_KEY } from "./context";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "tr") return saved;
  return navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((l) => (l === "en" ? "tr" : "en")),
    []
  );

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}
