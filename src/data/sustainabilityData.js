/**
 * Sustainability & Environmental Impact Analytics Data
 * Required Baseline Metrics for Problem Statement 26234:
 * - Food Rescued: 386 kg
 * - Food Redistributed: 342 kg
 * - Waste Diverted: 386 kg
 * - NGOs Connected: 12
 * - Successful Redistributions: 47
 *
 * Charts:
 * 1. Food rescued over time
 * 2. Redistribution by food category
 * 3. Source-wise surplus
 * 4. NGO-wise received food
 *
 * Section "Sustainability Impact":
 * - Food waste prevented
 * - Redistribution rate
 * - Unclaimed surplus
 * - Average time to redistribution
 *
 * Advanced Carbon Calculations labeled as "Future Enhancement"
 */

export const IMPACT_CORE_METRICS = {
  foodRescuedKg: 386,
  redistributedKg: 342,
  wasteDivertedKg: 386,
  ngosConnected: 12,
  successfulRedistributions: 47
};

export const SUSTAINABILITY_IMPACT_SECTION = {
  foodWastePrevented: "386 kg (94.2% of flagged volume)",
  redistributionRate: "88.6% successfully delivered",
  unclaimedSurplus: "11.4% (diverted to campus bio-compost)",
  averageTimeToRedistribution: "42 minutes (Dispatch to pickup)"
};

// 1. Food rescued over time (Daily / Weekly)
export const FOOD_RESCUED_OVER_TIME = [
  { day: "Mon", rescued: 42, redistributed: 38 },
  { day: "Tue", rescued: 58, redistributed: 52 },
  { day: "Wed", rescued: 64, redistributed: 59 },
  { day: "Thu", rescued: 49, redistributed: 44 },
  { day: "Fri", rescued: 72, redistributed: 65 },
  { day: "Sat", rescued: 55, redistributed: 48 },
  { day: "Sun", rescued: 46, redistributed: 36 }
];

// 2. Redistribution by food category
export const CATEGORY_BREAKDOWN = [
  { category: "Cooked Meals", quantityKg: 145, percentage: 42.4 },
  { category: "Curries & Veg", quantityKg: 95, percentage: 27.8 },
  { category: "Raw Produce", quantityKg: 52, percentage: 15.2 },
  { category: "Bakery / Breads", quantityKg: 32, percentage: 9.4 },
  { category: "Dairy", quantityKg: 18, percentage: 5.2 }
];

// 3. Source-wise surplus
export const SOURCE_WISE_SURPLUS = [
  { source: "North Campus Mess", surplusKg: 168 },
  { source: "Commissary Central", surplusKg: 112 },
  { source: "Grand Pavilion Catering", surplusKg: 74 },
  { source: "Skyline Tech Food Court", surplusKg: 32 }
];

// 4. NGO-wise received food
export const NGO_WISE_RECEIVED = [
  { ngo: "Hope Food Bank", receivedKg: 142 },
  { ngo: "Robin Hood Relief", receivedKg: 98 },
  { ngo: "Asha Kiran Shelter", receivedKg: 62 },
  { ngo: "Sanjeevani Care", receivedKg: 40 }
];
