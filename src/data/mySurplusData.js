/**
 * My Surplus Data (Food items registered by the Food Source)
 * Status Flow:
 * Inventory → Surplus Detected → Registered → Available for Matching → Waiting for NGO Match
 */

export const INITIAL_MY_SURPLUS = [
  {
    id: "SURP-01",
    foodName: "Cooked Rice",
    foodCategory: "Grain",
    quantity: 30,
    unit: "kg",
    postedAt: "Today 6:10 PM",
    prepTime: "6:00 PM",
    availableUntil: "10:00 PM",
    pickupRequired: "Required",
    location: "ABC Institutional Kitchen",
    status: "Available",
    matchingStatus: "Waiting for Match",
    additionalNotes: "Freshly prepared basmati rice. Kept hot >60°C in food-grade cambro boxes."
  },
  {
    id: "SURP-02",
    foodName: "Vegetables",
    foodCategory: "Vegetable",
    quantity: 15,
    unit: "kg",
    postedAt: "Today 5:20 PM",
    prepTime: "5:00 PM",
    availableUntil: "11:00 PM",
    pickupRequired: "Required",
    location: "ABC Institutional Kitchen",
    status: "Available",
    matchingStatus: "Waiting for Match",
    additionalNotes: "Mixed seasonal vegetable curry. Ready for direct distribution."
  }
];
