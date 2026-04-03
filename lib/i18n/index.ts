import id from "./id.json";
import en from "./en.json";

export type Locale = "id" | "en";

const dictionaries = { id, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.id;
}

export type Dictionary = ReturnType<typeof getDictionary>;
