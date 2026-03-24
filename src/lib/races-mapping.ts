export type RaceMappingItem = {
  /** Must match `calendar_key` on the corresponding Laravel event (admin: Event → Calendar key). */
  id: string;
  name: string;
  location: string;
  circuit: string;
  dateLabel: string;
  description: string;
  images: string[];
};

export const RACE_MAPPINGS: RaceMappingItem[] = [
  {
    id: "australian-gp",
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
  },
  {
    id: "chinese-gp",
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
  },
  {
    id: "japanese-gp",
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
  },
  {
    id: "bahrain-gp",
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
  },
  {
    id: "saudi-arabian-gp",
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
  },
  {
    id: "miami-gp",
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
  },
  {
    id: "canadian-gp",
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
  },
  {
    id: "monaco-gp",
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
  },
  {
    id: "spanish-gp",
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
  },
  {
    id: "austrian-gp",
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
  },
  {
    id: "british-gp",
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
  },
  {
    id: "belgian-gp",
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
  },
  {
    id: "hungarian-gp",
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
  },
  {
    id: "dutch-gp",
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
  },
  {
    id: "italian-gp",
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
  },
  {
    id: "madrid-gp",
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
  },
  {
    id: "azerbaijan-gp",
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
  },
  {
    id: "singapore-gp",
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
  },
  {
    id: "us-gp",
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
  },
  {
    id: "mexico-city-gp",
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
  },
  {
    id: "sao-paulo-gp",
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
  },
  {
    id: "las-vegas-gp",
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
  },
  {
    id: "qatar-gp",
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
  },
  {
    id: "abu-dhabi-gp",
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
  },
];
