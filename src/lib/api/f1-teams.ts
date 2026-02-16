const API_BASE_URL = "/api/f1experiences";
const F1_TEAM_SECTIONS_URL = `${API_BASE_URL}/f1-team-sections`;

export interface F1TeamDriver {
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export interface F1Team {
  id: number;
  name: string;
  logo_url: string | null;
  background_color: string;
  car_image_url: string | null;
  drivers: F1TeamDriver[];
}

export interface F1TeamSection {
  id: number;
  title: string;
  subtitle: string | null;
  year: number | null;
  teams: F1Team[];
}

interface F1TeamSectionsResponse {
  data: F1TeamSection[];
}

export async function fetchF1TeamSections(params?: {
  organiser_id?: number;
  year?: number;
}): Promise<F1TeamSection[]> {
  const search = new URLSearchParams();
  if (params?.organiser_id != null) search.set("organiser_id", String(params.organiser_id));
  if (params?.year != null) search.set("year", String(params.year));
  const url = search.toString() ? `${F1_TEAM_SECTIONS_URL}?${search}` : F1_TEAM_SECTIONS_URL;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = (await res.json()) as F1TeamSectionsResponse;
  return Array.isArray(json.data) ? json.data : [];
}
