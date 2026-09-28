export const INITIAL_METRICS = {
  foodRescuedKg: 18450,
  mealsDistributed: 46120,
  ngosConnected: 84,
  foodSources: 126,
  deliveriesCompleted: 1390,
  co2SavedKg: 35050
};

export const INITIAL_LISTINGS = [
  {
    id: "FB-101",
    title: "Dum Biryani, Dal Makhani & Tandoori Rotis",
    foodType: "Cooked Meals",
    dietType: "Vegetarian",
    quantity: 55,
    unit: "kg",
    servings: 160,
    provider: {
      name: "Royal Mirage Banquets & Caterers",
      type: "Catering Service",
      contactPerson: "Rajesh Malhotra",
      phone: "+91 98201 44521",
      address: "Gate 3, Royal Mirage Complex, Ring Road, Sector 18",
      area: "Sector 18, City Hub",
      distance: "2.3 km away",
      rating: 4.9,
      verified: true
    },
    postedAt: "1 hour ago",
    preparationTime: "Today, 7:30 PM",
    pickupDeadline: "Tonight, 11:30 PM",
    expiryHours: 3.5,
    status: "Available",
    urgency: "High",
    packagingType: "Stainless steel chafing inserts & sealed insulated food grade trays",
    storageRequirements: "Keep warm (above 60°C) or refrigerate immediately",
    safetyNote: "Untouched banquet surplus from wedding reception. Strict hygiene standard maintained.",
    allergens: ["Dairy (Ghee/Paneer)", "Cashews"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    claimedBy: null,
    pickupId: null
  },
  {
    id: "FB-102",
    title: "Assorted Fresh Breads, Focaccia & Croissants",
    foodType: "Bakery & Breads",
    dietType: "Vegetarian",
    quantity: 28,
    unit: "kg",
    servings: 90,
    provider: {
      name: "The Hearth & Crumb Artisan Bakery",
      type: "Bakery & Cafe",
      contactPerson: "Anita Sharma",
      phone: "+91 98112 39982",
      address: "Shop 12, Galleria Arcade, Phase 4",
      area: "Galleria Phase 4",
      distance: "1.4 km away",
      rating: 4.8,
      verified: true
    },
    postedAt: "40 mins ago",
    preparationTime: "Today, 11:00 AM",
    pickupDeadline: "Tomorrow, 8:00 AM",
    expiryHours: 12,
    status: "Available",
    urgency: "Normal",
    packagingType: "Clean food-grade paper crates and wax bags",
    storageRequirements: "Dry, ambient room temperature",
    safetyNote: "End of day fresh baked items, clean and boxed for immediate consumption or breakfast distribution.",
    allergens: ["Gluten", "Sesame"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    claimedBy: null,
    pickupId: null
  },
  {
    id: "FB-103",
    title: "Steamed Rice, Sambhar, Poriyal & Chapati Batch",
    foodType: "Cooked Meals",
    dietType: "Vegan",
    quantity: 70,
    unit: "kg",
    servings: 210,
    provider: {
      name: "TechnoWorld Campus - Green Mess",
      type: "College Hostel Mess",
      contactPerson: "Venkatesh Iyer",
      phone: "+91 98450 11299",
      address: "Block D Dining Hall, Campus North Gate",
      area: "University Enclave",
      distance: "3.8 km away",
      rating: 4.7,
      verified: true
    },
    postedAt: "2 hours ago",
    preparationTime: "Today, 6:00 PM",
    pickupDeadline: "Tonight, 10:45 PM",
    expiryHours: 2.5,
    status: "Requested",
    urgency: "Urgent",
    packagingType: "Large stainless vessels (bring your own vessels or exchange buckets)",
    storageRequirements: "Covered and kept hot",
    safetyNote: "Surplus evening meal prepared under university nutritional guidelines.",
    allergens: ["Mustard Seeds", "Lentils"],
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    claimedBy: {
      id: "NGO-01",
      name: "Feed The Hope Community Kitchen",
      representative: "Sister Maria / Amit",
      phone: "+91 97110 55432",
      volunteersAssigned: 2
    },
    pickupId: "PU-402"
  },
  {
    id: "FB-104",
    title: "Packaged Buffet Salad Boxes, Wraps & Fruit Bowls",
    foodType: "Packaged Meals",
    dietType: "Vegetarian",
    quantity: 42,
    unit: "kg",
    servings: 120,
    provider: {
      name: "The Grand Pavilion Luxury Hotel",
      type: "Hotel & Resort",
      contactPerson: "Chef Vikram Oberoi",
      phone: "+91 98991 77412",
      address: "Executive Banquet Service Bay, Grand Pavilion Drive",
      area: "Diplomatic Enclave",
      distance: "4.5 km away",
      rating: 5.0,
      verified: true
    },
    postedAt: "3 hours ago",
    preparationTime: "Today, 5:30 PM",
    pickupDeadline: "Tonight, 10:15 PM",
    expiryHours: 2,
    status: "Accepted",
    urgency: "Urgent",
    packagingType: "Individually packed biodegradable meal boxes with cutlery",
    storageRequirements: "Chilled storage recommended",
    safetyNote: "High-grade 5-star executive corporate dinner surplus. Temperature tracked.",
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    claimedBy: {
      id: "NGO-02",
      name: "Robin Hood Food Relief",
      representative: "Pooja Deshmukh",
      phone: "+91 98101 22334",
      volunteersAssigned: 3
    },
    pickupId: "PU-403"
  },
  {
    id: "FB-105",
    title: "Farm-Fresh Bulk Produce (Potatoes, Tomatoes, Greens)",
    foodType: "Raw Ingredients",
    dietType: "Vegan",
    quantity: 120,
    unit: "kg",
    servings: 350,
    provider: {
      name: "Sunrise Organic Caterers Central Store",
      type: "Catering Commissary",
      contactPerson: "Manish Gupta",
      phone: "+91 98711 00234",
      address: "Warehouse 8B, Mandi Logistics Park",
      area: "North Logistics Zone",
      distance: "6.2 km away",
      rating: 4.6,
      verified: true
    },
    postedAt: "5 hours ago",
    preparationTime: "Harvested yesterday",
    pickupDeadline: "Tomorrow, 4:00 PM",
    expiryHours: 24,
    status: "Picked Up",
    urgency: "Normal",
    packagingType: "Crates & jute sacks",
    storageRequirements: "Cool dry warehouse",
    safetyNote: "Wholesale surplus raw ingredients, grade A quality, suitable for community shelter kitchen.",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80",
    claimedBy: {
      id: "NGO-03",
      name: "Sanjeevani Shelter & Meals",
      representative: "Dr. K. Swaminathan",
      phone: "+91 98205 99881",
      volunteersAssigned: 2
    },
    pickupId: "PU-404"
  },
  {
    id: "FB-106",
    title: "Chicken Tikka, Butter Chicken & Jeera Rice",
    foodType: "Cooked Meals",
    dietType: "Non-Vegetarian",
    quantity: 48,
    unit: "kg",
    servings: 140,
    provider: {
      name: "Spice Symphony Banquet Hall",
      type: "Catering Service",
      contactPerson: "Harpreet Singh",
      phone: "+91 98110 88219",
      address: "Grand Trunk Road, Near Metro Pillar 142",
      area: "Industrial Area Phase 2",
      distance: "5.1 km away",
      rating: 4.8,
      verified: true
    },
    postedAt: "6 hours ago",
    preparationTime: "Today, 1:30 PM",
    pickupDeadline: "Today, 7:00 PM",
    expiryHours: 0,
    status: "Delivered",
    urgency: "Completed",
    packagingType: "Thermal insulated containers",
    storageRequirements: "Consumed immediately",
    safetyNote: "Inspected and distributed directly to temporary night relief shelters.",
    allergens: ["Poultry", "Dairy"],
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    claimedBy: {
      id: "NGO-04",
      name: "Asha Kiran Child Welfare & Shelter",
      representative: "Sunita Roy",
      phone: "+91 98330 11200",
      volunteersAssigned: 4
    },
    pickupId: "PU-405"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "REQ-901",
    listingId: "FB-103",
    listingTitle: "Steamed Rice, Sambhar, Poriyal & Chapati Batch",
    providerName: "TechnoWorld Campus - Green Mess",
    ngoName: "Feed The Hope Community Kitchen",
    requestedQuantity: "70 kg (approx 210 servings)",
    requestedAt: "Today, 7:45 PM",
    status: "Requested",
    pickupDeadline: "Tonight, 10:45 PM",
    contactPerson: "Amit Verma (Volunteer Lead)",
    contactPhone: "+91 97110 55432",
    transportMode: "Van with thermal boxes",
    notes: "We have 180 residents waiting at the shelter dining room. Our vehicle is fueled and ready.",
    pickupId: "PU-402"
  },
  {
    id: "REQ-902",
    listingId: "FB-104",
    listingTitle: "Packaged Buffet Salad Boxes, Wraps & Fruit Bowls",
    providerName: "The Grand Pavilion Luxury Hotel",
    ngoName: "Robin Hood Food Relief",
    requestedQuantity: "42 kg (120 boxed meals)",
    requestedAt: "Today, 6:30 PM",
    status: "Accepted",
    pickupDeadline: "Tonight, 10:15 PM",
    contactPerson: "Pooja Deshmukh",
    contactPhone: "+91 98101 22334",
    transportMode: "Eco Cargo E-Rickshaw",
    notes: "Accepted by Head Chef. Driver ETA 25 minutes. Security pass code generated.",
    pickupId: "PU-403"
  },
  {
    id: "REQ-903",
    listingId: "FB-105",
    listingTitle: "Farm-Fresh Bulk Produce (Potatoes, Tomatoes, Greens)",
    providerName: "Sunrise Organic Caterers Central Store",
    ngoName: "Sanjeevani Shelter & Meals",
    requestedQuantity: "120 kg wholesale sacks",
    requestedAt: "Today, 2:15 PM",
    status: "Picked Up",
    pickupDeadline: "Tomorrow, 4:00 PM",
    contactPerson: "Dr. K. Swaminathan",
    contactPhone: "+91 98205 99881",
    transportMode: "Small Tata Ace mini-truck",
    notes: "Loaded into truck. Currently en route to Sanjeevani Community Kitchen.",
    pickupId: "PU-404"
  },
  {
    id: "REQ-904",
    listingId: "FB-106",
    listingTitle: "Chicken Tikka, Butter Chicken & Jeera Rice",
    providerName: "Spice Symphony Banquet Hall",
    ngoName: "Asha Kiran Child Welfare & Shelter",
    requestedQuantity: "48 kg (140 servings)",
    requestedAt: "Today, 2:00 PM",
    status: "Delivered",
    pickupDeadline: "Today, 7:00 PM",
    contactPerson: "Sunita Roy",
    contactPhone: "+91 98330 11200",
    transportMode: "Insulated food delivery van",
    notes: "Successfully unloaded, checked and served to 140 individuals at community center.",
    pickupId: "PU-405"
  }
];

export const INITIAL_PICKUPS = {
  "PU-403": {
    id: "PU-403",
    listingId: "FB-104",
    orderId: "REQ-902",
    title: "Packaged Buffet Salad Boxes, Wraps & Fruit Bowls",
    foodType: "Packaged Meals",
    quantity: "42 kg (120 boxed meals)",
    status: "Out for Pickup",
    statusCode: "in_transit",
    progressPercent: 65,
    pickupPin: "4829",
    source: {
      name: "The Grand Pavilion Luxury Hotel",
      address: "Executive Banquet Service Bay, Grand Pavilion Drive, Diplomatic Enclave",
      contactPerson: "Chef Vikram Oberoi",
      phone: "+91 98991 77412",
      coordinates: { lat: 28.5921, lng: 77.1873 }
    },
    destination: {
      name: "Robin Hood Food Relief Center #4",
      address: "Community Welfare Hall, Block 7, Kidwai Nagar",
      contactPerson: "Pooja Deshmukh",
      phone: "+91 98101 22334",
      beneficiaries: "120 night shift shelter workers",
      coordinates: { lat: 28.5750, lng: 77.2140 }
    },
    volunteer: {
      name: "Rohan Malhotra",
      role: "Certified Food Relief Volunteer",
      phone: "+91 98734 56123",
      vehicle: "Eco Delivery Van (DL-3C-8921)",
      rating: 4.95,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    timeline: [
      {
        time: "6:30 PM",
        status: "Food Requested",
        desc: "NGO submitted instant claim for 120 boxed meals.",
        completed: true
      },
      {
        time: "6:42 PM",
        status: "Accepted by Donor",
        desc: "Hotel Banquet Manager verified surplus readiness.",
        completed: true
      },
      {
        time: "7:10 PM",
        status: "Volunteer Assigned & En Route",
        desc: "Rohan Malhotra dispatched with insulated transport boxes.",
        completed: true
      },
      {
        time: "7:35 PM (Current)",
        status: "Arrived at Source Bay",
        desc: "Driver is verifying packaging integrity and food temperature.",
        current: true,
        completed: false
      },
      {
        time: "Est. 8:15 PM",
        status: "Delivered to Beneficiary",
        desc: "Handover with shelter coordinator and safe feeding.",
        completed: false
      }
    ],
    eta: "18 mins to destination",
    distanceKm: "3.2 km remaining"
  }
};
