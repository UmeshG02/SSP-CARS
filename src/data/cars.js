export const carsData = [
  {
    id: "car-1",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 89990,
    mileage: 1200,
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    rating: 4.9,
    description: "The Tesla Model S Plaid is the ultimate high-performance electric sedan. Boasting a tri-motor setup producing over 1,020 horsepower, it delivers neck-snapping acceleration while maintaining luxury comfort and standard-setting range.",
    aiSummary: "The Model S Plaid dominates in raw straight-line acceleration and software integration. It features a spacious interior, next-gen gaming-capable console, and an advanced Autopilot platform. Recommended for tech enthusiasts demanding hypercar performance in a daily driver. *Cons: Interior materials feel slightly pedestrian compared to traditional luxury brands.*",
    pricingInsight: "Great Deal — $3,200 below current national average for 2024 Plaid models.",
    colors: [
      { name: "Solid Black", hex: "#0a0a0c" },
      { name: "Ultra Red", hex: "#a80f1d" },
      { name: "Deep Blue Metallic", hex: "#173b7a" },
      { name: "Pearl White Multi-Coat", hex: "#eaeaea" },
      { name: "Stealth Grey", hex: "#525456" }
    ],
    specs: {
      zeroToSixty: "1.99s",
      topSpeed: "200 mph",
      power: "1,020 hp",
      range: "396 mi",
      battery: "100 kWh",
      weight: "4,766 lbs"
    },
    dealer: {
      name: "SSP Elite Automobiles",
      city: "San Jose, CA",
      rating: 4.85,
      verified: true,
      phone: "+1 (555) 019-9233"
    },
    images: {
      main: "/assets/cars/tesla_plaid_main.png",
      gallery: [
        "/assets/cars/tesla_plaid_main.png",
        "/assets/cars/tesla_plaid_main.png"
      ]
    },
    trending: true
  },
  {
    id: "car-2",
    make: "Porsche",
    model: "Taycan Turbo S",
    year: 2024,
    price: 194900,
    mileage: 800,
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    rating: 4.95,
    description: "Porsche Taycan Turbo S offers electric driving dynamics in its purest form. With its 800-volt architecture, dual electric motors creating up to 750 hp overboost, and rear-axle steering, it drives exactly like a legendary Porsche sports car should.",
    aiSummary: "Porsche's premier electric sports sedan. Unmatched handling, driver engagement, and chassis feedback. Features high-speed 270kW charging capable of 5% to 80% in 22.5 mins. Recommended for performance drivers prioritizing cornering precision and build quality over maximum EV range. *Cons: Range is lower than rivals; tight rear seat legroom.*",
    pricingInsight: "Fair Market Price — High localized demand for Miami dealership inventory.",
    colors: [
      { name: "Carrara White Metallic", hex: "#fafafa" },
      { name: "Jet Black Metallic", hex: "#111113" },
      { name: "Frozen Blue Metallic", hex: "#94b9d0" },
      { name: "Mamba Green Metallic", hex: "#166a3f" },
      { name: "Carmine Red", hex: "#960018" }
    ],
    specs: {
      zeroToSixty: "2.6s",
      topSpeed: "161 mph",
      power: "750 hp",
      range: "222 mi",
      battery: "93.4 kWh",
      weight: "5,101 lbs"
    },
    dealer: {
      name: "SSP Porsche Experience Center",
      city: "Miami, FL",
      rating: 4.9,
      verified: true,
      phone: "+1 (555) 014-9911"
    },
    images: {
      main: "/assets/cars/porsche_taycan_main.png",
      gallery: [
        "/assets/cars/porsche_taycan_main.png",
        "/assets/cars/porsche_taycan_main.png"
      ]
    },
    trending: true
  },
  {
    id: "car-3",
    make: "Rivian",
    model: "R1S Adventure",
    year: 2024,
    price: 84000,
    mileage: 3400,
    bodyType: "SUV",
    fuelType: "Electric",
    transmission: "Automatic",
    rating: 4.8,
    description: "The Rivian R1S is a premium all-electric three-row SUV designed for extreme offroad capability and daily family comfort. Driven by a quad-motor AWD system delivering 835 hp, it tackles rock crawls and highway sprints with ease.",
    aiSummary: "The R1S blends utility, eco-friendliness, and performance. Features three rows seating 7, a standard air suspension giving up to 14.9 inches of ground clearance, and unique gear tunnel storage. Excellent utility choice for large families with active outdoor lifestyles. *Cons: Ride quality can feel slightly stiff compared to standard air-ride SUVs.*",
    pricingInsight: "Excellent Deal — $2,100 under current Kelly Blue Book valuation.",
    colors: [
      { name: "Rivian Blue", hex: "#1560bd" },
      { name: "Forest Green", hex: "#2f4f4f" },
      { name: "Launch Green", hex: "#6f7f6f" },
      { name: "LA Silver", hex: "#c0c0c0" },
      { name: "El Cap Granite", hex: "#4b5320" }
    ],
    specs: {
      zeroToSixty: "3.0s",
      topSpeed: "125 mph",
      power: "835 hp",
      range: "321 mi",
      battery: "135 kWh",
      weight: "7,000 lbs"
    },
    dealer: {
      name: "Pacific West Adventure Motors",
      city: "Seattle, WA",
      rating: 4.75,
      verified: true,
      phone: "+1 (555) 012-3838"
    },
    images: {
      main: "/assets/cars/rivian_r1s_main.png",
      gallery: [
        "/assets/cars/rivian_r1s_main.png",
        "/assets/cars/rivian_r1s_main.png"
      ]
    },
    trending: false
  },
  {
    id: "car-4",
    make: "Lucid",
    model: "Air Sapphire",
    year: 2024,
    price: 249000,
    mileage: 150,
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    rating: 4.98,
    description: "Lucid Air Sapphire is the pinnacle of luxury EV engineering. Powered by a tri-motor configuration generating 1,234 horsepower, it achieves unmatched track capabilities while housing occupants in an opulent, spacious cabin with a Glass Canopy roof.",
    aiSummary: "The fastest production sedan in the world. Merges hypercar speed (1200+ hp) with executive luxury, custom carbon-ceramic brakes, and 427 miles of real-world range. Highlighted by its elegant glass dome cockpit and hand-stitched leather. Ideal for collectors. *Cons: Extreme entry cost.*",
    pricingInsight: "Highly Collectible — Premium retail pricing due to limited run allocations.",
    colors: [
      { name: "Sapphire Blue Metallic", hex: "#0b2240" },
      { name: "Infinite Black", hex: "#0c0d0e" },
      { name: "Stellar White", hex: "#fafafa" }
    ],
    specs: {
      zeroToSixty: "1.89s",
      topSpeed: "205 mph",
      power: "1,234 hp",
      range: "427 mi",
      battery: "118 kWh",
      weight: "5,336 lbs"
    },
    dealer: {
      name: "SSP California Luxury Fleet",
      city: "Beverly Hills, CA",
      rating: 4.98,
      verified: true,
      phone: "+1 (555) 902-1000"
    },
    images: {
      main: "/assets/cars/lucid_sapphire_main.png",
      gallery: [
        "/assets/cars/lucid_sapphire_main.png",
        "/assets/cars/lucid_sapphire_main.png"
      ]
    },
    trending: true
  },
  {
    id: "car-5",
    make: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price: 147100,
    mileage: 1600,
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    rating: 4.75,
    description: "The Audi RS e-tron GT is a masterpiece of electric grand touring. Sharing platform development with the Porsche Taycan, it offers rapid charging speeds, a luxury cockpit featuring Audi Virtual Cockpit, and classic Quattro stability.",
    aiSummary: "An exceptional everyday touring vehicle. Features excellent ride quality, classic luxury cabin materials, and dramatic futuristic street presence. Fast charging at 270 kW gets you back on the highway in 22 minutes. Recommended for owners wanting premium styling. *Cons: Infotainment is slightly dated; rear head clearance is limited.*",
    pricingInsight: "Competitive Deal — $4,500 below regional averages for luxury EVs.",
    colors: [
      { name: "Tactical Green Metallic", hex: "#555d50" },
      { name: "Daytona Gray Pearl", hex: "#4a4e52" },
      { name: "Ascari Blue Metallic", hex: "#0c2c54" },
      { name: "Kemora Gray Metallic", hex: "#7a8b99" },
      { name: "Mythos Black Metallic", hex: "#0e0f10" }
    ],
    specs: {
      zeroToSixty: "3.1s",
      topSpeed: "155 mph",
      power: "637 hp",
      range: "232 mi",
      battery: "93.4 kWh",
      weight: "5,137 lbs"
    },
    dealer: {
      name: "Metro Audi Sport",
      city: "New York, NY",
      rating: 4.6,
      verified: false,
      phone: "+1 (555) 234-9000"
    },
    images: {
      main: "/assets/cars/audi_etron_main.png",
      gallery: [
        "/assets/cars/audi_etron_main.png",
        "/assets/cars/audi_etron_main.png"
      ]
    },
    trending: false
  },
  {
    id: "car-6",
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2023,
    price: 223800,
    mileage: 450,
    bodyType: "Coupe",
    fuelType: "Petrol",
    transmission: "Automatic",
    rating: 4.99,
    description: "The Porsche 911 GT3 RS is a street-legal race car. Its naturally aspirated 4.0-liter flat-six screams to 9,000 RPM, producing 518 horsepower. Features extreme carbon-fiber aerodynamics and a massive active DRS rear wing.",
    aiSummary: "The ultimate track weapon. Highlights include extreme motorsport aerodynamics, active drag reduction, fully adjustable suspension toggles on the steering wheel, and a raw mechanical engine roar. Recommended for racing enthusiasts. *Cons: Extreme engine noise in cabin; no cargo trunk (occupied by radiators).*",
    pricingInsight: "Market Premium — High collectible markup; $15k above original MSRP due to extreme scarcity.",
    colors: [
      { name: "GT Silver Metallic", hex: "#bebebe" },
      { name: "White / Pyro Red Accent", hex: "#f0f2f5" },
      { name: "Shark Blue", hex: "#0062a3" },
      { name: "Guards Red", hex: "#d31115" },
      { name: "Racing Yellow", hex: "#fcd116" }
    ],
    specs: {
      zeroToSixty: "3.0s",
      topSpeed: "184 mph",
      power: "518 hp",
      range: "310 mi",
      battery: "N/A (Petrol)",
      weight: "3,268 lbs"
    },
    dealer: {
      name: "SSP Porsche Experience Center",
      city: "Miami, FL",
      rating: 4.9,
      verified: true,
      phone: "+1 (555) 014-9911"
    },
    images: {
      main: "/assets/cars/porsche_gt3rs_main.png",
      gallery: [
        "/assets/cars/porsche_gt3rs_main.png",
        "/assets/cars/porsche_gt3rs_main.png"
      ]
    },
    trending: true
  },
  {
    id: "car-7",
    make: "Ferrari",
    model: "SF90 Stradale",
    year: 2023,
    price: 524000,
    mileage: 620,
    bodyType: "Coupe",
    fuelType: "Hybrid",
    transmission: "Automatic",
    rating: 4.97,
    description: "The Ferrari SF90 Stradale is Maranello's flagship plug-in hybrid supercar. A twin-turbo V8 combines with three electric motors to output a staggering 986 hp, routed to all four wheels for mind-bending cornering capability.",
    aiSummary: "Maranello's hybrid magnum opus. Features AWD vectoring, a sleek wrap-around jet-fighter canopy, touch-screen steering wheel control systems, and pure electric silent-driving capability for local commutes. Recommended for luxury supercar collectors. *Cons: Cargo capacity is negligible; complex software system.*",
    pricingInsight: "Elite Investment — Stable valuations with slight appreciation potential.",
    colors: [
      { name: "Rosso Corsa", hex: "#cc0000" },
      { name: "Giallo Modena", hex: "#ffcc00" },
      { name: "Nero Daytona", hex: "#111111" },
      { name: "Argento Nurburgring", hex: "#c0c0c0" }
    ],
    specs: {
      zeroToSixty: "2.4s",
      topSpeed: "211 mph",
      power: "986 hp",
      range: "350 mi",
      battery: "7.9 kWh",
      weight: "3,461 lbs"
    },
    dealer: {
      name: "SSP California Luxury Fleet",
      city: "Beverly Hills, CA",
      rating: 4.98,
      verified: true,
      phone: "+1 (555) 902-1000"
    },
    images: {
      main: "/assets/cars/ferrari_sf90_main.png",
      gallery: [
        "/assets/cars/ferrari_sf90_main.png",
        "/assets/cars/ferrari_sf90_main.png"
      ]
    },
    trending: true
  }
];

export const blogArticles = [
  {
    id: "blog-1",
    title: "The Rise of Solid-State Batteries: Charging the Future in 5 Minutes",
    summary: "Solid-state batteries are nearing mass production. We analyze how this breakthrough will double luxury EV range and match gas-station refueling speeds.",
    date: "May 25, 2026",
    category: "Technology",
    readTime: "5 min read",
    author: "Elena Rostova",
    image: "/assets/blog/solid_state.png"
  },
  {
    id: "blog-2",
    title: "Porsche GT Division Hints at Next-Gen Hybrid Race Architectures",
    summary: "Exclusive interview with Porsche engineers discussing how they plan to integrate electric turbochargers into the next generation of track cars without losing mechanical soul.",
    date: "May 18, 2026",
    category: "Motorsport",
    readTime: "7 min read",
    author: "Marc Webber",
    image: "/assets/blog/porsche_hybrid.png"
  },
  {
    id: "blog-3",
    title: "AI In The Driver's Seat: Autonomous Commuting in the Next Decade",
    summary: "A deep dive into Level 4 and Level 5 autonomy, detailing the hardware sensors and neural network architectures shaping tomorrow's highway cruises.",
    date: "May 12, 2026",
    category: "AI & Autonomous",
    readTime: "6 min read",
    author: "Dr. Kenji Tanaka",
    image: "/assets/blog/ai_autonomous.png"
  }
];
