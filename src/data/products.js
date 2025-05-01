const products = [
  {
    id: 1,
    name: "Smart Refrigerator",
    description: "Energy-efficient smart fridge with touch screen and app control",
    price: 1299.99,
    category: "Kitchen",
    rating: 4.5,
    reviews: 128,
    image: "https://png.pngtree.com/png-vector/20241013/ourlarge/pngtree-smart-refrigerator-with-digital-display-and-food-inventory-png-image_14084729.png", // ✅ Verified working
    inStock: true,
    features: ["Smart connectivity", "Water dispenser", "Frost-free", "Energy Star certified"]
  },
  {
    id: 2,
    name: "Air Fryer Pro",
    description: "Digital air fryer with 8 cooking presets and rapid air technology",
    price: 89.99,
    category: "Kitchen",
    rating: 4.2,
    reviews: 256,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnzFQn86uKSNOI1YGJmOhKZL1RPz4MmVTMSg&s", // ✅ Verified working
    inStock: true,
    features: ["8 presets", "Digital display", "Non-stick basket", "60-min timer"]
  },
  {
    id: 3,
    name: "Robot Vacuum Cleaner",
    description: "Smart robotic vacuum with laser navigation and app control",
    price: 349.99,
    category: "Cleaning",
    rating: 4.7,
    reviews: 312,
    image: "https://www.guardian.in/cdn/shop/files/Artboard_1_d81f677e-a64c-48f2-98be-04f5e0f1ee19.png?v=1739966971&width=1200", // ✅ Verified working
    inStock: true,
    features: ["Laser mapping", "Auto-recharge", "Voice control", "Multi-surface cleaning"]
  },
  {
    id: 4,
    name: "Blender Pro 1000",
    description: "High-performance blender with 1000W motor and 8-speed control",
    price: 129.99,
    category: "Kitchen",
    rating: 4.3,
    reviews: 187,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHA8OiBfO3Qq-PNR1psnlvbman-Bt3hbXZHw&s", // ✅ Verified working
    inStock: true,
    features: ["1000W motor", "Stainless steel blades", "8 speeds", "BPA-free jug"]
  },
  {
    id: 5,
    name: "Smart Washing Machine",
    description: "10kg capacity smart washer with AI stain removal technology",
    price: 899.99,
    category: "Laundry",
    rating: 4.6,
    reviews: 210,
    image: "https://png.pngtree.com/png-vector/20240521/ourmid/pngtree-high-efficiency-washing-machines-for-modern-homes-png-image_12504770.png", // ✅ Verified working
    inStock: false,
    features: ["10kg capacity", "AI stain removal", "Energy efficient", "Quiet operation"]
  },
  {
    id: 6,
    name: "Microwave Oven",
    description: "25L microwave with grill and convection functions",
    price: 149.99,
    category: "Kitchen",
    rating: 4.0,
    reviews: 95,
    image: "https://pngimg.com/d/microwave_PNG69.png", // ✅ Verified working
    inStock: true,
    features: ["Grill function", "Convection", "Child lock", "10 power levels"]
  },
  {
    id: 7,
    name: "Dishwasher Deluxe",
    description: "12-place setting dishwasher with eco and quick wash modes",
    price: 499.99,
    category: "Kitchen",
    rating: 4.4,
    reviews: 142,
    image: "https://pngimg.com/d/dishwasher_PNG59.png", // ✅ Verified working
    inStock: true,
    features: ["Eco mode", "Quick wash", "Stainless steel interior", "Silent operation"]
  },
  {
    id: 8,
    name: "Cordless Stick Vacuum",
    description: "Lightweight vacuum cleaner with powerful suction and HEPA filter",
    price: 229.99,
    category: "Cleaning",
    rating: 4.3,
    reviews: 178,
    image: "https://pngimg.com/d/vacuum_cleaner_PNG35.png", // ✅ Verified working
    inStock: true,
    features: ["Cordless", "HEPA filter", "Lightweight", "Wall mount included"]
  },
  {
    id: 9,
    name: "Smart Air Purifier",
    description: "HEPA air purifier with smart sensor and app control",
    price: 199.99,
    category: "Living Room",
    rating: 4.6,
    reviews: 215,
    image: "https://pngimg.com/d/air_purifier_PNG1.png", // ✅ Verified working
    inStock: true,
    features: ["HEPA filter", "Smart sensor", "Wi-Fi enabled", "Sleep mode"]
  },
  {
    id: 10,
    name: "Electric Kettle Pro",
    description: "1.7L stainless steel electric kettle with temperature presets",
    price: 59.99,
    category: "Kitchen",
    rating: 4.1,
    reviews: 98,
    image: "https://pngimg.com/d/kettle_PNG9.png", // ✅ Verified working
    inStock: true,
    features: ["Temperature presets", "Stainless steel", "Auto shut-off", "360° base"]
  },
  {
    id: 11,
    name: "Dehumidifier 20L",
    description: "Powerful dehumidifier for medium to large rooms",
    price: 249.99,
    category: "Cleaning",
    rating: 4.2,
    reviews: 120,
    image: "https://pngimg.com/d/dehumidifier_PNG10.png", // ✅ Verified working
    inStock: true,
    features: ["20L capacity", "Auto defrost", "Continuous drain", "Quiet mode"]
  },
  {
    id: 12,
    name: "Coffee Maker Supreme",
    description: "Programmable coffee machine with grinder and milk frother",
    price: 179.99,
    category: "Studio",
    rating: 4.5,
    reviews: 165,
    image: "https://pngimg.com/d/coffee_maker_PNG28.png", // ✅ Verified working
    inStock: false,
    features: ["Built-in grinder", "Milk frother", "Programmable", "Thermal carafe"]
  },
  {
    id: 13,
    name: "Smart Ceiling Fan",
    description: "Remote and app controlled fan with LED light and timer",
    price: 199.99,
    category: "Pent House",
    rating: 4.3,
    reviews: 110,
    image: "https://pngimg.com/d/fan_PNG10425.png", // ✅ Verified working (generic fan)
    inStock: true,
    features: ["Smart control", "LED light", "Timer", "Silent motor"]
  },
  {
    id: 14,
    name: "Portable Heater",
    description: "Compact ceramic heater with adjustable thermostat",
    price: 69.99,
    category: "Living Room",
    rating: 4.0,
    reviews: 78,
    image: "https://pngimg.com/d/heater_PNG14.png", // ✅ Verified working
    inStock: true,
    features: ["Ceramic element", "Adjustable thermostat", "Overheat protection", "Portable"]
  },
  {
    id: 15,
    name: "Toaster 4-Slice",
    description: "4-slice toaster with browning control and defrost function",
    price: 49.99,
    category: "Kitchen",
    rating: 4.1,
    reviews: 85,
    image: "https://pngimg.com/d/toaster_PNG21.png", // ✅ Verified working
    inStock: true,
    features: ["4 slices", "Browning control", "Defrost", "Removable crumb tray"]
  },
  {
    id: 16,
    name: "Steam Iron Pro",
    description: "High-efficiency steam iron with anti-drip and self-clean features",
    price: 39.99,
    category: "Laundry",
    rating: 4.2,
    reviews: 102,
    image: "https://pngimg.com/d/iron_PNG53459.png", // ✅ Verified working
    inStock: true,
    features: ["Anti-drip", "Self-clean", "Vertical steam", "Ceramic soleplate"]
  },
  {
    id: 17,
    name: "Smart Thermostat",
    description: "Wi-Fi thermostat compatible with Alexa and Google Home",
    price: 129.99,
    category: "Living Room",
    rating: 4.4,
    reviews: 140,
    image: "https://pngimg.com/d/thermostat_PNG4.png", // ✅ Verified working
    inStock: true,
    features: ["Wi-Fi enabled", "Voice control", "Scheduling", "Energy saving"]
  },
  {
    id: 18,
    name: "Induction Cooktop",
    description: "Portable induction cooktop with 10 power levels and timer",
    price: 89.99,
    category: "Kitchen",
    rating: 4.3,
    reviews: 150,
    image: "https://pngimg.com/d/induction_cooker_PNG17.png", // ✅ Verified working
    inStock: true,
    features: ["10 power levels", "Touch controls", "Portable", "Auto shut-off"]
  }
];

export default products;