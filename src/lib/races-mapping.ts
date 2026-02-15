export type RaceMappingItem = {
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
    id: "bahrain-gp",
    name: "Bahrain Grand Prix",
    location: "Sakhir, Bahrain",
    circuit: "Bahrain International Circuit",
    dateLabel: "March 2026",
    description:
      "A desert night-race classic with strong overtaking zones and premium hospitality views under floodlights.",
    images: [
      "/backgrounds/Bahrain Grand Prix/2025 Bahrain GP - George Russell & Carlos Sainz.jpg",
      "/backgrounds/Bahrain Grand Prix/2025 Bahrain GP - Max Verstappen 3.jpg",
      "/backgrounds/Bahrain Grand Prix/2025 Bahrain GP - Kimi Antonelli Pit Box.jpg",
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
    id: "monaco-gp",
    name: "Monaco Grand Prix",
    location: "Monte Carlo, Monaco",
    circuit: "Circuit de Monaco",
    dateLabel: "May 2026",
    description:
      "Iconic harbor-side race with limited ticket inventory and unmatched prestige for VIP and premium packages.",
    images: [
      "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Race Start.jpg",
      "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Charles Leclerc.jpg",
      "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Lewis Hamilton.jpg",
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
    id: "italian-gp",
    name: "Italian Grand Prix",
    location: "Monza / Imola, Italy",
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
    dateLabel: "October 2026",
    description:
      "A vibrant fan-heavy weekend known for altitude, stadium sections, and high local demand.",
    images: [
      "/backgrounds/Mexico City Grand Prix/2025 Mexico City GP - Max Verstappen Pitlane.jpg",
      "/backgrounds/Mexico City Grand Prix/2025 Mexico City GP - Liam Lawson 3.jpg",
      "/backgrounds/Mexico City Grand Prix/2025 Mexico City GP - George Russell 4.jpg",
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
