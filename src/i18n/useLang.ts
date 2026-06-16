import { useCallback, useContext } from "react";
import type { L, Lang } from "../types";
import { LangCtx, type LangCtxValue } from "./context";

export function useLang(): LangCtxValue {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Pick a localized value; empty string/array falls back to EN. */
export function pick<T>(v: L<T>, lang: Lang): T {
  const cur = v[lang];
  if (typeof cur === "string" && cur.trim() === "") return v.en;
  if (Array.isArray(cur) && cur.length === 0) return v.en;
  return cur;
}

/** Hook form: returns a `t(localized)` reader bound to the active language. */
export function useT(): <T>(v: L<T>) => T {
  const { lang } = useLang();
  return useCallback(<T,>(v: L<T>) => pick(v, lang), [lang]);
}
