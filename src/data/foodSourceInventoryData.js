/**
 * Food Source Inventory Data for Step 3
 * Contains items with:
 * - Food Item
 * - Category
 * - Available Quantity
 * - Expected Requirement
 * - Potential Surplus (Available - Expected)
 * - Available Until
 * - Status (Normal | Surplus | Urgent)
 */

export const INITIAL_FOOD_SOURCE_INVENTORY = [
  {
    id: "FSI-01",
    item: "Rice",
    category: "Grain",
    availableQty: 100,
    requiredQty: 70,
    unit: "kg",
    availableUntil: "4 hours",
    status: "Surplus",
    location: "ABC Institutional Kitchen - Hot Holding Bay",
    prepTime: "Today, 1:30 PM",
    storageCondition: "Hot-holding >60°C"
  },
  {
    id: "FSI-02",
    item: "Vegetables",
    category: "Vegetable",
    availableQty: 60,
    requiredQty: 42,
    unit: "kg",
    availableUntil: "7 hours",
    status: "Surplus",
    location: "ABC Institutional Kitchen - Block C Pantry",
    prepTime: "Today, 2:00 PM",
    storageCondition: "Hot-holding >60°C"
  },
  {
    id: "FSI-03",
    item: "Dal",
    category: "Pulse",
    availableQty: 40,
    requiredQty: 38,
    unit: "kg",
    availableUntil: "2 days",
    status: "Normal",
    location: "ABC Institutional Kitchen - Walk-in Chiller",
    prepTime: "Today, 12:30 PM",
    storageCondition: "Refrigerated <4°C"
  },
  {
    id: "FSI-04",
    item: "Bread",
    category: "Bakery",
    availableQty: 25,
    requiredQty: 18,
    unit: "kg",
    availableUntil: "5 hours",
    status: "Urgent",
    location: "ABC Institutional Kitchen - Bakery Counter",
    prepTime: "Today, 8:00 AM",
    storageCondition: "Dry ambient storage"
  },
  {
    id: "FSI-05",
    item: "Curd / Plain Yogurt",
    category: "Dairy",
    availableQty: 35,
    requiredQty: 35,
    unit: "kg",
    availableUntil: "1 day",
    status: "Normal",
    location: "ABC Institutional Kitchen - Dairy Chiller",
    prepTime: "Today, 6:00 AM",
    storageCondition: "Chilled 2°C – 4°C"
  },
  {
    id: "FSI-06",
    item: "Seasonal Papaya",
    category: "Fruit",
    availableQty: 20,
    requiredQty: 12,
    unit: "kg",
    availableUntil: "3 hours",
    status: "Urgent",
    location: "ABC Institutional Kitchen - Fruit Bay",
    prepTime: "Received this morning",
    storageCondition: "Ambient cool"
  }
];

export const FOOD_CATEGORIES = [
  "All",
  "Grain",
  "Vegetable",
  "Pulse",
  "Bakery",
  "Dairy",
  "Fruit"
];
