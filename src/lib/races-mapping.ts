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
      "/backgrounds/Australian Grand Prix/2025 Australian GP - Charles Leclerc.jpg",
      "/backgrounds/Australian Grand Prix/2025 Australian GP - Max Verstappen & Charles Leclerc.jpg",
      "/backgrounds/Australian Grand Prix/2025 Australian GP - George Russell.jpg",
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
      "/backgrounds/Chinese Grand Prix/2025 Chinese GP - George Russell 2.jpg",
      "/backgrounds/Chinese Grand Prix/2025 Chinese GP - Kimi Antonelli.jpg",
      "/backgrounds/Chinese Grand Prix/2025 Chinese GP - Liam Lawson.jpg",
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
      "/backgrounds/Japanese Grand Prix/2025 Japanese GP - Race Start 2.jpg",
      "/backgrounds/Japanese Grand Prix/2025 Japanese GP - Max Verstappen Pit Stop.jpg",
      "/backgrounds/Japanese Grand Prix/2025 Japanese GP - Kimi Antonelli & Oscar Piastri.jpg",
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
      "/backgrounds/Bahrain Grand Prix/2025 Bahrain GP - George Russell & Carlos Sainz.jpg",
      "/backgrounds/Bahrain Grand Prix/2025 Bahrain GP - Max Verstappen 3.jpg",
      "/backgrounds/Bahrain Grand Prix/2025 Bahrain GP - Kimi Antonelli Pit Box.jpg",
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
      "/backgrounds/Saudi Arabian Grand Prix/2025 Saudi Arabian GP - Jeddah Corniche Circuit.jpg",
      "/backgrounds/Saudi Arabian Grand Prix/2025 Saudi Arabian GP - Max Verstappen Pitlane.jpg",
      "/backgrounds/Saudi Arabian Grand Prix/2025 Saudi Arabian GP - George Russell Pit Box.jpg",
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
      "/backgrounds/Miami Grand Prix/2025 Miami GP - Charles Leclerc Pit Box.jpg",
      "/backgrounds/Miami Grand Prix/2025 Miami GP - Pierre Gasly.jpg",
      "/backgrounds/Miami Grand Prix/2025 Miami GP - Yuki Tsunoda 3.jpg",
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
      "/backgrounds/Canadian Grand Prix/2025 Canadian GP - Charles Leclerc.jpg",
      "/backgrounds/Canadian Grand Prix/2025 Canadian GP - George Russell Pit Box.jpg",
      "/backgrounds/Canadian Grand Prix/2025 Canadian GP - George Russell & Kimi Antonelli.jpg",
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
      "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Race Start.jpg",
      "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Charles Leclerc.jpg",
      "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Lewis Hamilton.jpg",
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
      "/backgrounds/Spanish Grand Prix/2025 Spanish GP - Charles Leclerc.jpg",
      "/backgrounds/Spanish Grand Prix/2025 Spanish GP - Lewis Hamilton.jpg",
      "/backgrounds/Spanish Grand Prix/2025 Spanish GP - Pierre Gasly.jpg",
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
      "/backgrounds/Austrian Grand Prix/2025 Austrian GP - Race Start.jpg",
      "/backgrounds/Austrian Grand Prix/2025 Austrian GP - Max Verstappen 3.jpg",
      "/backgrounds/Austrian Grand Prix/2025 Austrian GP - Lando Norris & Oscar Piastri 3.jpg",
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
      "/backgrounds/British Grand Prix/2025 British GP - Lewis Hamilton Grid.jpg",
      "/backgrounds/British Grand Prix/2025 British GP - Max Verstappen.jpg",
      "/backgrounds/British Grand Prix/2025 British GP - Pierre Gasly 4.jpg",
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
      "/backgrounds/Belgian Grand Prix/2025 Belgian GP - Circuit de Spa-Francorchamps.jpg",
      "/backgrounds/Belgian Grand Prix/2025 Belgian GP - Charles Leclerc 6.jpg",
      "/backgrounds/Belgian Grand Prix/2025 Belgian GP - George Russell 2.jpg",
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
      "/backgrounds/Hungarian Grand Prix/2025 Hungarian GP - George Russell.jpg",
      "/backgrounds/Hungarian Grand Prix/2025 Hungarian GP - George Russell 3.JPG",
      "/backgrounds/Hungarian Grand Prix/2025 Hungarian GP - Max Verstappen & Fernando Alonso.jpg",
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
      "/backgrounds/Dutch Grand Prix/2025 Dutch GP - George Russell.jpg",
      "/backgrounds/Dutch Grand Prix/2025 Dutch GP - Charles Leclerc Pit Stop.jpg",
      "/backgrounds/Dutch Grand Prix/2025 Dutch GP - Franco Colapinto.jpg",
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
      "/backgrounds/Italian Grand Prix/2025 Italian GP - George Russell 2.jpg",
      "/backgrounds/Italian Grand Prix/2025 Italian GP - Lewis Hamilton.jpg",
      "/backgrounds/Italian Grand Prix/2025 Italian GP - Max Verstappen 3.jpg",
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
      "/backgrounds/Madrid Grand Prix/2025 Pre-Season Testing - Isack Hadjar 2.jpg",
      "/backgrounds/Madrid Grand Prix/2025 Pre-Season Testing - Isack Hadjar 3.jpg",
      "/backgrounds/Madrid Grand Prix/2025 Pre-Season Testing - Isack Hadjar 4.jpg",
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
      "/backgrounds/Azerbaijan Grand Prix/2025 Azerbaijan GP - Max Verstappen Pitlane.jpg",
      "/backgrounds/Azerbaijan Grand Prix/2025 Azerbaijan GP - George Russell 2.jpg",
      "/backgrounds/Azerbaijan Grand Prix/2025 Azerbaijan GP - Max Verstappen 3.jpg",
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
      "/backgrounds/Singapore Grand Prix/2025 Singapore GP - Marina Bay Street Circuit.jpg",
      "/backgrounds/Singapore Grand Prix/2025 Singapore GP - Max Verstappen 8.jpg",
      "/backgrounds/Singapore Grand Prix/2025 Singapore GP - George Russell Celebration.jpg",
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
      "/backgrounds/United States Grand Prix/2025 United States GP - Max Verstappen Celebration 3.jpg",
      "/backgrounds/United States Grand Prix/2025 United States GP - George Russell 2.jpg",
      "/backgrounds/United States Grand Prix/2025 United States GP - Oliver Bearman.jpg",
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
      "/backgrounds/Mexico City Grand Prix/2025 Mexico City GP - Max Verstappen Pitlane.jpg",
      "/backgrounds/Mexico City Grand Prix/2025 Mexico City GP - Liam Lawson 3.jpg",
      "/backgrounds/Mexico City Grand Prix/2025 Mexico City GP - George Russell 4.jpg",
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
      "/backgrounds/São Paulo Grand Prix/2025 São Paulo GP - Charles Leclerc 2.jpg",
      "/backgrounds/São Paulo Grand Prix/2025 São Paulo GP - George Russell 2.jpg",
      "/backgrounds/São Paulo Grand Prix/2025 São Paulo GP - Max Verstappen.jpg",
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
      "/backgrounds/Las Vegas Grand Prix/2025 Las Vegas GP - Las Vegas Strip Circuit.jpg",
      "/backgrounds/Las Vegas Grand Prix/2025 Las Vegas GP - Race Start 4.jpg",
      "/backgrounds/Las Vegas Grand Prix/2025 Las Vegas GP - Max Verstappen.jpg",
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
      "/backgrounds/Qatar Grand Prix/2025 Qatar GP - Max Verstappen.jpg",
      "/backgrounds/Qatar Grand Prix/2025 Qatar GP - Kimi Antonelli.jpg",
      "/backgrounds/Qatar Grand Prix/2025 Qatar GP - Max Verstappen & Lando Norris.jpg",
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
      "/backgrounds/Abu Dhabi Grand Prix/2025 Abu Dhabi GP - End of Season - Driver Photo 3.jpg",
      "/backgrounds/Abu Dhabi Grand Prix/2025 Abu Dhabi GP - Max Verstappen 3.jpg",
      "/backgrounds/Abu Dhabi Grand Prix/2025 Abu Dhabi GP - Oscar Piastri.jpg",
    ],
  },
];
