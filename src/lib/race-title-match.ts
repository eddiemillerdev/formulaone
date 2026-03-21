import type { EventItem } from "@/lib/api/events";

/** Normalize GP titles for comparing API event names to static race mapping names. */
export function normalizeRaceTitle(title: string) {
  const folded = title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
  return folded
    .replace(/formula\s*1|f1|®|™/gi, "")
    .replace(/\b20\d{2}\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * API titles often use sponsor + local language (e.g. GRAND PRIX DU CANADA, GRAN PREMIO D'ITALIA).
 * These hints must appear in the normalized API title for a mapping to match.
 */
function locationHintsForMappingName(mappingName: string): string[] {
  const n = normalizeRaceTitle(mappingName);
  const hints: string[] = [];

  const add = (...parts: string[]) => {
    for (const p of parts) {
      const t = normalizeRaceTitle(p);
      if (t) hints.push(t);
    }
  };

  if (n.includes("australian")) add("australia", "melbourne", "albert park");
  if (n.includes("chinese")) add("china", "shanghai");
  if (n.includes("japanese")) add("japan", "suzuka", "japanese");
  if (n.includes("bahrain")) add("bahrain", "sakhir");
  if (n.includes("saudi")) add("saudi", "jeddah");
  if (n.includes("miami")) add("miami");
  if (n.includes("canadian")) add("canada", "canadian", "grand prix du canada");
  if (n.includes("monaco")) add("monaco", "monte carlo");
  if (n.includes("spanish") && !n.includes("madrid")) add("barcelona", "catalunya", "catalonia", "spanish");
  if (n.includes("austrian")) add("austria", "spielberg", "red bull ring");
  if (n.includes("british")) add("silverstone", "british");
  if (n.includes("belgian")) add("belgian", "spa", "spa francorchamps");
  if (n.includes("hungarian")) add("hungary", "hungarian", "hungaroring");
  if (n.includes("dutch")) add("dutch", "zandvoort", "netherlands");
  if (n.includes("italian")) add("italia", "italian", "italy", "monza");
  if (n.includes("madrid")) add("madrid", "espana", "españa", "gran premio de espana");
  if (n.includes("azerbaijan")) add("azerbaijan", "baku");
  if (n.includes("singapore")) add("singapore", "marina bay");
  if (n.includes("united states") && n.includes("grand prix")) add("united states", "austin", "cota", "americas");
  if (n.includes("mexico city")) add("mexico", "ciudad", "mexico city");
  if (n.includes("são paulo") || n.includes("sao paulo")) add("sao paulo", "são paulo", "brazil", "interlagos");
  if (n.includes("las vegas")) add("las vegas");
  if (n.includes("qatar")) add("qatar", "lusail");
  if (n.includes("abu dhabi")) add("abu dhabi", "yas marina");

  return hints;
}

export function raceTitlesMatch(apiTitle: string, mappingOrQueryName: string) {
  const a = normalizeRaceTitle(apiTitle);
  const b = normalizeRaceTitle(mappingOrQueryName);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  for (const hint of locationHintsForMappingName(mappingOrQueryName)) {
    if (hint && a.includes(hint)) return true;
  }
  return false;
}

/**
 * Prefer `calendar_key` from the API (must equal `RaceMappingItem.id`, e.g. japanese-gp), then title matching.
 */
export function findEventForRace(events: EventItem[], race: { id: string; name: string }): EventItem | null {
  const byKey = events.find((e) => e.calendarKey && e.calendarKey === race.id);
  if (byKey) return byKey;
  for (const e of events) {
    if (raceTitlesMatch(e.name, race.name)) return e;
  }
  return null;
}

/** Search box / URL q= filter: substring match plus GP title matching for long API names. */
export function eventMatchesSearchQuery(event: EventItem, rawQuery: string) {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;
  if (event.calendarKey && event.calendarKey === query) return true;
  const haystack = [event.name, event.city, event.country, event.venue, event.zone]
    .join(" ")
    .toLowerCase();
  if (haystack.includes(query)) return true;
  return raceTitlesMatch(event.name, rawQuery.trim());
}
