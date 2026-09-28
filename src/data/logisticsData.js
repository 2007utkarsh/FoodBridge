/**
 * Logistics & Geospatial Data for Leaflet / OpenStreetMap Integration
 * Realistic institutional kitchen clusters & verified NGO recipient network.
 * Coordinates centered around Delhi NCR institutional corridor.
 */

export const MAP_CENTER = [28.6139, 77.2090]; // Institutional Hub Center
export const DEFAULT_ZOOM = 13;

export const FACILITY_LOCATIONS = {
  sources: [
    {
      id: "SRC-01",
      name: "Apex Campus Central Mess",
      type: "Institutional Kitchen",
      address: "Gate 2, North Campus Complex, Institutional Area",
      coordinates: [28.6280, 77.2150],
      phone: "+91 98101 22334",
      manager: "Chef Arvind Sharma",
      activeSurplusKg: 58,
      status: "Active Dispatch"
    },
    {
      id: "SRC-02",
      name: "Commissary Central Store",
      type: "Food Processing Unit",
      address: "Warehouse Bay 4, Industrial Food Cluster",
      coordinates: [28.6450, 77.2350],
      phone: "+91 98711 00234",
      manager: "Manish Gupta",
      activeSurplusKg: 42,
      status: "Holding"
    },
    {
      id: "SRC-03",
      name: "Grand Pavilion Banquet & Catering",
      type: "Commercial Caterer",
      address: "Outer Ring Road Convention Centre",
      coordinates: [28.5921, 77.1873],
      phone: "+91 98991 77412",
      manager: "Vikram Oberoi",
      activeSurplusKg: 85,
      status: "Scheduled"
    },
    {
      id: "SRC-04",
      name: "Skyline Tech Park Food Court #3",
      type: "Corporate Cafeteria",
      address: "Tower B, Phase 2 IT Hub",
      coordinates: [28.5600, 77.2250],
      phone: "+91 98205 33410",
      manager: "Sumanth Rao",
      activeSurplusKg: 35,
      status: "Active"
    }
  ],
  ngos: [
    {
      id: "REC-A",
      name: "Hope Food Bank & Community Kitchen",
      type: "Community Shelter",
      address: "Plot 14, Sector 7 Relief Colony",
      coordinates: [28.5800, 77.2300],
      phone: "+91 97110 55432",
      coordinator: "Anjali Verma",
      dailyCapacityKg: 250,
      currentOccupancy: "180 Beneficiaries",
      verified: true
    },
    {
      id: "REC-B",
      name: "Robin Hood Food Relief Network",
      type: "Night Distribution Hub",
      address: "Community Hall, Block D, Outer Ring Road",
      coordinates: [28.5600, 77.1950],
      phone: "+91 98205 99881",
      coordinator: "Vikas Saxena",
      dailyCapacityKg: 300,
      currentOccupancy: "240 Beneficiaries",
      verified: true
    },
    {
      id: "REC-C",
      name: "Sanjeevani Care Home & Kitchen",
      type: "Elderly & Destitute Shelter",
      address: "Near Metro Gate 2, Shanti Nagar",
      coordinates: [28.6100, 77.2450],
      phone: "+91 98330 11200",
      coordinator: "Dr. K. Swaminathan",
      dailyCapacityKg: 100,
      currentOccupancy: "65 Beneficiaries",
      verified: true
    },
    {
      id: "REC-D",
      name: "Asha Kiran Child Welfare Shelter",
      type: "Children Home",
      address: "Lane 5, Mehrauli Relief Enclave",
      coordinates: [28.5450, 77.2100],
      phone: "+91 98112 44901",
      coordinator: "Sister Maria",
      dailyCapacityKg: 150,
      currentOccupancy: "110 Children",
      verified: true
    }
  ]
};

// Polyline Route Waypoints for realistic street tracking
export const ACTIVE_ROUTES = [
  {
    id: "ROUTE-501",
    redistributionId: "RED-501",
    title: "Steamed Basmati Rice (30 kg) Handover",
    sourceId: "SRC-01",
    destinationId: "REC-A",
    sourceName: "Apex Campus Central Mess",
    destinationName: "Hope Food Bank",
    sourceCoords: [28.6280, 77.2150],
    destCoords: [28.5800, 77.2300],
    // High-resolution waypoint polyline
    waypoints: [
      [28.6280, 77.2150],
      [28.6220, 77.2180],
      [28.6140, 77.2210],
      [28.6050, 77.2260],
      [28.5930, 77.2280],
      [28.5800, 77.2300]
    ],
    driver: {
      name: "Rameshwar Yadav",
      phone: "+91 98199 44321",
      vehicle: "Insulated Van (DL-04-C-8921)",
      vehicleType: "Thermal Temperature-Controlled",
      currentTemp: "63.2°C (Safe Hot-holding)"
    },
    distanceKm: 2.4,
    travelTimeMins: 18,
    pickupDeadline: "Tonight, 10:00 PM",
    currentLocation: [28.6050, 77.2260],
    status: "In Transit",
    pinCode: "5912",
    stage: 4
  },
  {
    id: "ROUTE-502",
    redistributionId: "RED-502",
    title: "Mixed Seasonal Vegetables (15 kg)",
    sourceId: "SRC-01",
    destinationId: "REC-B",
    sourceName: "Apex Campus Central Mess",
    destinationName: "Robin Hood Food Relief",
    sourceCoords: [28.6280, 77.2150],
    destCoords: [28.5600, 77.1950],
    waypoints: [
      [28.6280, 77.2150],
      [28.6150, 77.2050],
      [28.5950, 77.1980],
      [28.5750, 77.1960],
      [28.5600, 77.1950]
    ],
    driver: {
      name: "Amit Solanki",
      phone: "+91 98205 99881",
      vehicle: "Covered E-Cargo (DL-11-ER-342)",
      vehicleType: "Insulated Electric Cargo",
      currentTemp: "61.8°C"
    },
    distanceKm: 5.8,
    travelTimeMins: 24,
    pickupDeadline: "Tonight, 7:30 PM",
    currentLocation: [28.6280, 77.2150],
    status: "Accepted / Awaiting Dispatch",
    pinCode: "3481",
    stage: 3
  }
];
