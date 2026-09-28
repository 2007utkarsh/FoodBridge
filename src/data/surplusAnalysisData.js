/**
 * Smart Surplus Analysis Data
 * Evaluates current vs expected requirements and generates automated recommendations.
 */

export const INITIAL_SURPLUS_ANALYSIS = [
  {
    id: "SSA-01",
    item: "Steamed Basmati Rice",
    category: "Cooked Meals",
    currentQty: 100,
    expectedRequirement: 70,
    surplusQty: 30,
    unit: "kg",
    timeRemaining: "8 hours",
    urgency: "Medium",
    aiRecommendation: "Redistribute surplus immediately to nearby community shelters with high rice requirements.",
    riskLevel: "Moderate shelf degradation if uncollected past 20:00",
    storageSafeTemp: "64°C",
    sourceFacility: "Apex Campus Central Mess",
    matchedItemRef: "SUR-101"
  },
  {
    id: "SSA-02",
    item: "Mixed Seasonal Vegetables (Curry)",
    category: "Cooked Meals",
    currentQty: 50,
    expectedRequirement: 35,
    surplusQty: 15,
    unit: "kg",
    timeRemaining: "5 hours",
    urgency: "Urgent",
    aiRecommendation: "Priority redistribution required. Assign immediate volunteer dispatch within 45 minutes.",
    riskLevel: "High risk of exceeding HACCP 4-hour hot-holding threshold",
    storageSafeTemp: "62°C",
    sourceFacility: "Apex Campus Central Mess",
    matchedItemRef: "SUR-102"
  },
  {
    id: "SSA-03",
    item: "Farm-Fresh Tomatoes",
    category: "Raw Produce",
    currentQty: 30,
    expectedRequirement: 18,
    surplusQty: 12,
    unit: "kg",
    timeRemaining: "4 hours (Cold room transfer limit)",
    urgency: "Urgent",
    aiRecommendation: "Redistribute surplus immediately or transfer to processing unit for puree/sauce production.",
    riskLevel: "High moisture condensation risk in ambient holding",
    storageSafeTemp: "14°C",
    sourceFacility: "Commissary Central Store",
    matchedItemRef: "SUR-103"
  },
  {
    id: "SSA-04",
    item: "Pasteurized Dairy Paneer",
    category: "Dairy & Perishables",
    currentQty: 35,
    expectedRequirement: 22,
    surplusQty: 13,
    unit: "kg",
    timeRemaining: "4 hours",
    urgency: "Urgent",
    aiRecommendation: "Redistribute immediately via refrigerated vehicle to prevent bacterial growth.",
    riskLevel: "High perishability; cold-chain SLA mandatory",
    storageSafeTemp: "3.5°C",
    sourceFacility: "Apex Campus Central Mess",
    matchedItemRef: "SUR-104"
  },
  {
    id: "SSA-05",
    item: "Whole Wheat Chapatis / Rotis",
    category: "Breads",
    currentQty: 450,
    expectedRequirement: 320,
    surplusQty: 130,
    unit: "units",
    timeRemaining: "6 hours",
    urgency: "Medium",
    aiRecommendation: "Bundle with Dal and Rice redistribution request for full balanced nutritional parcel.",
    riskLevel: "Dryness and texture hardening after 6 hours",
    storageSafeTemp: "Ambient insulated container",
    sourceFacility: "Apex Campus Central Mess",
    matchedItemRef: "SUR-105"
  }
];
