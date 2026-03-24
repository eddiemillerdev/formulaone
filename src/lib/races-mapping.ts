export type RaceDepositPackage = {
  id: string;
  label: string;
  /** Display amount (e.g. "GBP 500"). */
  amountLabel: string;
};

/** Default deposit tiers shown on each race; same catalogue for every Grand Prix. */
export const DEFAULT_DEPOSIT_PACKAGES: RaceDepositPackage[] = [
  { id: "fan-package", label: "Fan Package Deposit", amountLabel: "GBP 500" },
  { id: "hospitality", label: "Hospitality Deposit", amountLabel: "GBP 4,500" },
  { id: "paddock-club", label: "Paddock Club™ Hospitality Deposit", amountLabel: "GBP 8,800" },
];

export type RaceMappingItem = {
  /** Must match `calendar_key` on the corresponding Laravel event (admin: Event → Calendar key). */
  id: string;
  /** ISO 3166-1 alpha-2 country code for flag emoji (e.g. GB, AE). */
  flagCountryCode: string;
  /**
   * Root-relative path to the 2027 race flag SVG under `public/` (e.g. `/2027/race-flags/...svg`).
   * Use with `publicLocalPath()` when rendering so it is not rewritten to CDN.
   */
  flagSvgPath: string;
  name: string;
  location: string;
  circuit: string;
  dateLabel: string;
  description: string;
  images: string[];
  packages: RaceDepositPackage[];
};

export const RACE_MAPPINGS: RaceMappingItem[] = [
  {
    id: "australian-gp",
    flagCountryCode: "AU",
    flagSvgPath: "/2027/race-flags/152000-Australia-ddca3432247cb1f71e78c2ac2c9a323a.svg",
    name: "Australian Grand Prix",
    location: "Melbourne, Australia",
    circuit: "Albert Park Grand Prix Circuit",
    dateLabel: "March 2026",
    description:
      "Season opener energy, a fast street-style layout, and one of the strongest fan atmospheres on the calendar.",
    images: [
      "/backgrounds/Australian Grand Prix/1.jpg",
      "/backgrounds/Australian Grand Prix/2.jpg",
      "/backgrounds/Australian Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "chinese-gp",
    flagCountryCode: "CN",
    flagSvgPath: "/2027/race-flags/152065-China-5bc1580c2e1d5ade660e53d8c8e89f2d.svg",
    name: "Chinese Grand Prix",
    location: "Shanghai, China",
    circuit: "Shanghai International Circuit",
    dateLabel: "March 2026",
    description:
      "Long straights and technical corners with strong hospitality demand across grandstand and premium categories.",
    images: [
      "/backgrounds/Chinese Grand Prix/1.jpg",
      "/backgrounds/Chinese Grand Prix/2.jpg",
      "/backgrounds/Chinese Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "japanese-gp",
    flagCountryCode: "JP",
    flagSvgPath: "/2027/race-flags/152017-Japan-7af897fa1b5bc154727bb20a31964c71.svg",
    name: "Japanese Grand Prix",
    location: "Suzuka, Japan",
    circuit: "Suzuka International Racing Course",
    dateLabel: "March 2026",
    description:
      "Figure-of-eight legend with high-speed esses and passionate local crowds every race weekend.",
    images: [
      "/backgrounds/Japanese Grand Prix/1.jpg",
      "/backgrounds/Japanese Grand Prix/2.jpg",
      "/backgrounds/Japanese Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "bahrain-gp",
    flagCountryCode: "BH",
    flagSvgPath: "/2027/race-flags/152004-Bahrain-67a988d581fee8fea766e0c9920c617f.svg",
    name: "Bahrain Grand Prix",
    location: "Sakhir, Bahrain",
    circuit: "Bahrain International Circuit",
    dateLabel: "April 2026",
    description:
      "A desert night-race classic with strong overtaking zones and premium hospitality views under floodlights.",
    images: [
      "/backgrounds/Bahrain Grand Prix/1.jpg",
      "/backgrounds/Bahrain Grand Prix/2.jpg",
      "/backgrounds/Bahrain Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "saudi-arabian-gp",
    flagCountryCode: "SA",
    flagSvgPath: "/2027/race-flags/152003-Saudi_Arabia-5beaae53c93b59f9a076269c95c4df23.svg",
    name: "Saudi Arabian Grand Prix",
    location: "Jeddah, Saudi Arabia",
    circuit: "Jeddah Corniche Circuit",
    dateLabel: "April 2026",
    description:
      "The fastest street circuit on the calendar, racing at night along the Red Sea with non-stop action.",
    images: [
      "/backgrounds/Saudi Arabian Grand Prix/1.jpg",
      "/backgrounds/Saudi Arabian Grand Prix/2.jpg",
      "/backgrounds/Saudi Arabian Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "miami-gp",
    flagCountryCode: "US",
    flagSvgPath: "/2027/race-flags/152019-United_States-1f164b9144a3374bb47919ddbf44350e.svg",
    name: "Miami Grand Prix",
    location: "Miami, USA",
    circuit: "Miami International Autodrome",
    dateLabel: "May 2026",
    description:
      "High-profile race weekend with premium hospitality demand, nightlife access, and strong global interest.",
    images: [
      "/backgrounds/Miami Grand Prix/1.jpg",
      "/backgrounds/Miami Grand Prix/2.jpg",
      "/backgrounds/Miami Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "canadian-gp",
    flagCountryCode: "CA",
    flagSvgPath: "/2027/race-flags/152018-Canada-d0de68d7d4b1d5aacdc732f73796d72d.svg",
    name: "Canadian Grand Prix",
    location: "Montreal, Canada",
    circuit: "Circuit Gilles-Villeneuve",
    dateLabel: "May 2026",
    description:
      "Island circuit known for close racing, wall-lined chicanes, and one of the loudest North American crowds.",
    images: [
      "/backgrounds/Canadian Grand Prix/1.jpg",
      "/backgrounds/Canadian Grand Prix/2.jpg",
      "/backgrounds/Canadian Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "monaco-gp",
    flagCountryCode: "MC",
    flagSvgPath: "/2027/race-flags/152016-Monaco-97be05aafa65bb72b3b34ff0970c7127.svg",
    name: "Monaco Grand Prix",
    location: "Monte Carlo, Monaco",
    circuit: "Circuit de Monaco",
    dateLabel: "June 2026",
    description:
      "Iconic harbor-side race with limited ticket inventory and unmatched prestige for VIP and premium packages.",
    images: [
      "/backgrounds/Monaco Grand Prix/1.jpg",
      "/backgrounds/Monaco Grand Prix/2.jpg",
      "/backgrounds/Monaco Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "spanish-gp",
    flagCountryCode: "ES",
    flagSvgPath: "/2027/race-flags/152008-Spain-819e6945b3254a0a9378604157f90af2.svg",
    name: "Spanish Grand Prix",
    location: "Barcelona, Spain",
    circuit: "Circuit de Barcelona-Catalunya",
    dateLabel: "June 2026",
    description:
      "A proven pre-season benchmark track with varied corners and strong demand for grandstand and VIP seats.",
    images: [
      "/backgrounds/Spanish Grand Prix/1.jpg",
      "/backgrounds/Spanish Grand Prix/2.jpg",
      "/backgrounds/Spanish Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "austrian-gp",
    flagCountryCode: "AT",
    flagSvgPath: "/2027/race-flags/152007-Austria-f3fe30504c6e73a99ad80f4417d89665.svg",
    name: "Austrian Grand Prix",
    location: "Spielberg, Austria",
    circuit: "Red Bull Ring",
    dateLabel: "June 2026",
    description:
      "Short lap, big elevation changes, and festival atmosphere in the Styrian mountains.",
    images: [
      "/backgrounds/Austrian Grand Prix/1.jpg",
      "/backgrounds/Austrian Grand Prix/2.jpg",
      "/backgrounds/Austrian Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "british-gp",
    flagCountryCode: "GB",
    flagSvgPath: "/2027/race-flags/152006-United_Kingdom-6f6ee614a9b4d26807b58fa299fc7314.svg",
    name: "British Grand Prix",
    location: "Silverstone, United Kingdom",
    circuit: "Silverstone Circuit",
    dateLabel: "July 2026",
    description:
      "Historic high-speed corners, massive crowds, and a race weekend known for loud, all-day grandstand atmosphere.",
    images: [
      "/backgrounds/British Grand Prix/1.jpg",
      "/backgrounds/British Grand Prix/2.jpg",
      "/backgrounds/British Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "belgian-gp",
    flagCountryCode: "BE",
    flagSvgPath: "/2027/race-flags/152005-Belgium-6ea701e7eae9b051073cbf3f7134adec.svg",
    name: "Belgian Grand Prix",
    location: "Spa-Francorchamps, Belgium",
    circuit: "Circuit de Spa-Francorchamps",
    dateLabel: "July 2026",
    description:
      "Ardennes weather, Eau Rouge, and one of the longest laps in F1 with huge elevation change.",
    images: [
      "/backgrounds/Belgian Grand Prix/1.jpg",
      "/backgrounds/Belgian Grand Prix/2.jpg",
      "/backgrounds/Belgian Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "hungarian-gp",
    flagCountryCode: "HU",
    flagSvgPath: "/2027/race-flags/152015-Hungary-687aada921b406dd1294be48183fca29.svg",
    name: "Hungarian Grand Prix",
    location: "Budapest, Hungary",
    circuit: "Hungaroring",
    dateLabel: "July 2026",
    description:
      "Twisty, technical Hungaroring layout where qualifying and race strategy often decide the podium.",
    images: [
      "/backgrounds/Hungarian Grand Prix/1.jpg",
      "/backgrounds/Hungarian Grand Prix/2.jpg",
      "/backgrounds/Hungarian Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "dutch-gp",
    flagCountryCode: "NL",
    flagSvgPath: "/2027/race-flags/152011-Netherlands-a6be82151016b0b306a032fc43367d12.svg",
    name: "Dutch Grand Prix",
    location: "Zandvoort, Netherlands",
    circuit: "Circuit Zandvoort",
    dateLabel: "August 2026",
    description:
      "Banked corners, dunes, and one of the most energetic fan bases on the calendar.",
    images: [
      "/backgrounds/Dutch Grand Prix/1.jpg",
      "/backgrounds/Dutch Grand Prix/2.jpg",
      "/backgrounds/Dutch Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "italian-gp",
    flagCountryCode: "IT",
    flagSvgPath: "/2027/race-flags/152010-Italy-a28c10f5435e203f872847843cdd4406.svg",
    name: "Italian Grand Prix",
    location: "Monza, Italy",
    circuit: "Autodromo Nazionale Monza",
    dateLabel: "September 2026",
    description:
      "Tifosi-driven race weekend with strong heritage, high-speed straights, and high demand across all categories.",
    images: [
      "/backgrounds/Italian Grand Prix/1.jpg",
      "/backgrounds/Italian Grand Prix/2.jpg",
      "/backgrounds/Italian Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "madrid-gp",
    flagCountryCode: "ES",
    flagSvgPath: "/2027/race-flags/152008-Spain-819e6945b3254a0a9378604157f90af2.svg",
    name: "Madrid Grand Prix",
    location: "Madrid, Spain",
    circuit: "IFEMA Madrid Circuit",
    dateLabel: "September 2026",
    description:
      "New city-centre style racing in the Spanish capital with fresh hospitality and grandstand experiences.",
    images: [
      "/backgrounds/Madrid Grand Prix/1.jpg",
      "/backgrounds/Madrid Grand Prix/2.jpg",
      "/backgrounds/Madrid Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "azerbaijan-gp",
    flagCountryCode: "AZ",
    flagSvgPath: "/2027/race-flags/152009-Azerbijan-9c351aea65e58d73a7e7f224c71acd57.svg",
    name: "Azerbaijan Grand Prix",
    location: "Baku, Azerbaijan",
    circuit: "Baku City Circuit",
    dateLabel: "September 2026",
    description:
      "Blistering straights through the old city and a tight castle section that punishes mistakes.",
    images: [
      "/backgrounds/Azerbaijan Grand Prix/1.jpg",
      "/backgrounds/Azerbaijan Grand Prix/2.jpg",
      "/backgrounds/Azerbaijan Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "singapore-gp",
    flagCountryCode: "SG",
    flagSvgPath: "/2027/race-flags/152014-Singapore-6356eecfc1ba1adfd3d3e043ac9a139f.svg",
    name: "Singapore Grand Prix",
    location: "Singapore",
    circuit: "Marina Bay Street Circuit",
    dateLabel: "October 2026",
    description:
      "Night-race spectacle in the city center with premium skyline viewing and hospitality-led demand.",
    images: [
      "/backgrounds/Singapore Grand Prix/1.jpg",
      "/backgrounds/Singapore Grand Prix/2.jpg",
      "/backgrounds/Singapore Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "us-gp",
    flagCountryCode: "US",
    flagSvgPath: "/2027/race-flags/152019-United_States-1f164b9144a3374bb47919ddbf44350e.svg",
    name: "United States Grand Prix",
    location: "Austin, USA",
    circuit: "Circuit of The Americas",
    dateLabel: "October 2026",
    description:
      "High-energy US weekend with strong corporate demand and full hospitality programs around race day.",
    images: [
      "/backgrounds/United States Grand Prix/1.jpg",
      "/backgrounds/United States Grand Prix/2.jpg",
      "/backgrounds/United States Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "mexico-city-gp",
    flagCountryCode: "MX",
    flagSvgPath: "/2027/race-flags/152013-Mexico-230abfe1801b52d73c564dd99362774c.svg",
    name: "Mexico City Grand Prix",
    location: "Mexico City, Mexico",
    circuit: "Autodromo Hermanos Rodriguez",
    dateLabel: "November 2026",
    description:
      "A vibrant fan-heavy weekend known for altitude, stadium sections, and high local demand.",
    images: [
      "/backgrounds/Mexico City Grand Prix/1.jpg",
      "/backgrounds/Mexico City Grand Prix/2.jpg",
      "/backgrounds/Mexico City Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "sao-paulo-gp",
    flagCountryCode: "BR",
    flagSvgPath: "/2027/race-flags/152012-Brazil-f31260f6733f40b7a1202faf946fbaa0.svg",
    name: "São Paulo Grand Prix",
    location: "São Paulo, Brazil",
    circuit: "Autódromo José Carlos Pace",
    dateLabel: "November 2026",
    description:
      "Iconic Interlagos layout with elevation, weather swings, and one of the most passionate crowds in motorsport.",
    images: [
      "/backgrounds/Sao Paulo Grand Prix/1.jpg",
      "/backgrounds/Sao Paulo Grand Prix/2.jpg",
      "/backgrounds/Sao Paulo Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "las-vegas-gp",
    flagCountryCode: "US",
    flagSvgPath: "/2027/race-flags/152019-United_States-1f164b9144a3374bb47919ddbf44350e.svg",
    name: "Las Vegas Grand Prix",
    location: "Las Vegas, USA",
    circuit: "Las Vegas Strip Circuit",
    dateLabel: "November 2026",
    description:
      "Late-season night race on the Strip with premium demand for hospitality, suites, and city packages.",
    images: [
      "/backgrounds/Las Vegas Grand Prix/1.jpg",
      "/backgrounds/Las Vegas Grand Prix/2.jpg",
      "/backgrounds/Las Vegas Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "qatar-gp",
    flagCountryCode: "QA",
    flagSvgPath: "/2027/race-flags/152002-Qatar-36399ff2c0ee67ebe44d585c169d2526.svg",
    name: "Qatar Grand Prix",
    location: "Lusail, Qatar",
    circuit: "Lusail International Circuit",
    dateLabel: "November 2026",
    description:
      "Fast modern circuit under lights with strong premium inventory and late-season championship pressure.",
    images: [
      "/backgrounds/Qatar Grand Prix/1.jpg",
      "/backgrounds/Qatar Grand Prix/2.jpg",
      "/backgrounds/Qatar Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
  {
    id: "abu-dhabi-gp",
    flagCountryCode: "AE",
    flagSvgPath: "/2027/race-flags/152001-United_Arab_Emirates-7f2c4a67c892779b088a56599acd6204.svg",
    name: "Abu Dhabi Grand Prix",
    location: "Yas Island, UAE",
    circuit: "Yas Marina Circuit",
    dateLabel: "December 2026",
    description:
      "Season finale with sunset racing, premium marina views, and strong demand for final-round packages.",
    images: [
      "/backgrounds/Abu Dhabi Grand Prix/1.jpg",
      "/backgrounds/Abu Dhabi Grand Prix/2.jpg",
      "/backgrounds/Abu Dhabi Grand Prix/3.jpg",
    ],
    packages: DEFAULT_DEPOSIT_PACKAGES,
  },
];

export function getRaceMappingById(raceId: string): RaceMappingItem | undefined {
  return RACE_MAPPINGS.find((r) => r.id === raceId);
}
