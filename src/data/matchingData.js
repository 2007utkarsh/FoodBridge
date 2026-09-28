/**
 * AI-Based Recipient Matching Prototype Data
 * Specifically aligned with Problem Statement 26234 requirements:
 *
 * Example:
 * SURPLUS: 30 kg Rice
 * Potential Recipients:
 * - NGO A (Hope Food Bank): Distance 2.4 km | Required: 25 kg | Capacity: 40 kg | Match Score: 91% (Recommended)
 * - NGO B (Robin Hood Relief): Distance 5.8 km | Required: 50 kg | Capacity: 60 kg | Match Score: 74%
 * - Community Kitchen C (Sanjeevani Care): Distance 3.1 km | Required: 10 kg | Capacity: 20 kg | Match Score: 68%
 *
 * Explicitly labeled: "AI-based matching prototype"
 */

export const INITIAL_MATCHING_POOL = [
  {
    surplusId: "SUR-101",
    foodItem: "30 kg Rice",
    foodTitle: "Cooked Steamed Basmati Rice",
    surplusQty: 30,
    unit: "kg",
    sourceFacility: "ABC Institutional Kitchen",
    sourceAddress: "Gate 2, North Campus Complex, Institutional Area",
    availableUntil: "10:00 PM Tonight",
    potentialRecipients: [
      {
        id: "REC-A",
        name: "NGO A (Hope Food Bank)",
        type: "Community Food Bank & Shelter",
        distanceKm: 2.4,
        distanceText: "2.4 km",
        requiredQty: 25,
        capacityQty: 40,
        unit: "kg",
        beneficiaries: 180,
        dietaryMatch: "100%",
        transportReady: "Insulated Van Available",
        matchScore: 91,
        isRecommended: true,
        scoreBreakdown: {
          requirementFit: 94,
          quantityFit: 92,
          proximityFit: 93,
          capacitySafety: 90,
          urgencyFit: 86
        },
        address: "Plot 14, Sector 7 Relief Colony"
      },
      {
        id: "REC-B",
        name: "NGO B (Robin Hood Relief)",
        type: "Night Distribution Network",
        distanceKm: 5.8,
        distanceText: "5.8 km",
        requiredQty: 50,
        capacityQty: 60,
        unit: "kg",
        beneficiaries: 240,
        dietaryMatch: "100%",
        transportReady: "E-Rickshaw Team",
        matchScore: 74,
        isRecommended: false,
        scoreBreakdown: {
          requirementFit: 82,
          quantityFit: 70,
          proximityFit: 68,
          capacitySafety: 85,
          urgencyFit: 65
        },
        address: "Community Hall, Block D, Outer Ring Road"
      },
      {
        id: "REC-C",
        name: "Community Kitchen C (Sanjeevani Care)",
        type: "Elderly & Destitute Shelter",
        distanceKm: 3.1,
        distanceText: "3.1 km",
        requiredQty: 10,
        capacityQty: 20,
        unit: "kg",
        beneficiaries: 65,
        dietaryMatch: "100%",
        transportReady: "Two-Wheeler Carrier",
        matchScore: 68,
        isRecommended: false,
        scoreBreakdown: {
          requirementFit: 70,
          quantityFit: 55,
          proximityFit: 84,
          capacitySafety: 60,
          urgencyFit: 71
        },
        address: "Near Metro Gate 2, Shanti Nagar"
      }
    ]
  },
  {
    surplusId: "SUR-102",
    foodItem: "15 kg Vegetables",
    foodTitle: "Mixed Seasonal Vegetables (Curry)",
    surplusQty: 15,
    unit: "kg",
    sourceFacility: "ABC Institutional Kitchen",
    sourceAddress: "Gate 2, North Campus Complex",
    availableUntil: "7:30 PM Tonight (Urgent)",
    potentialRecipients: [
      {
        id: "REC-A",
        name: "NGO A (Hope Food Bank)",
        type: "Community Food Bank",
        distanceKm: 2.4,
        distanceText: "2.4 km",
        requiredQty: 18,
        capacityQty: 30,
        unit: "kg",
        beneficiaries: 180,
        dietaryMatch: "100%",
        transportReady: "Insulated Van Available",
        matchScore: 89,
        isRecommended: true,
        scoreBreakdown: {
          requirementFit: 92,
          quantityFit: 88,
          proximityFit: 93,
          capacitySafety: 88,
          urgencyFit: 84
        },
        address: "Plot 14, Sector 7 Relief Colony"
      },
      {
        id: "REC-C",
        name: "Community Kitchen C (Sanjeevani Care)",
        type: "Elderly Shelter",
        distanceKm: 3.1,
        distanceText: "3.1 km",
        requiredQty: 12,
        capacityQty: 20,
        unit: "kg",
        beneficiaries: 65,
        dietaryMatch: "100%",
        transportReady: "Two-Wheeler Carrier",
        matchScore: 82,
        isRecommended: false,
        scoreBreakdown: {
          requirementFit: 85,
          quantityFit: 80,
          proximityFit: 84,
          capacitySafety: 78,
          urgencyFit: 83
        },
        address: "Near Metro Gate 2, Shanti Nagar"
      }
    ]
  },
  {
    surplusId: "SUR-103",
    foodItem: "12 kg Tomatoes",
    foodTitle: "Farm-Fresh Tomatoes",
    surplusQty: 12,
    unit: "kg",
    sourceFacility: "Commissary Central Store",
    sourceAddress: "Warehouse Bay 4, Industrial Food Cluster",
    availableUntil: "3:00 PM Today (4 hrs)",
    potentialRecipients: [
      {
        id: "REC-A",
        name: "NGO A (Hope Food Bank)",
        type: "Community Food Bank",
        distanceKm: 2.4,
        distanceText: "2.4 km",
        requiredQty: 15,
        capacityQty: 40,
        unit: "kg",
        beneficiaries: 180,
        dietaryMatch: "100%",
        transportReady: "Insulated Van",
        matchScore: 93,
        isRecommended: true,
        scoreBreakdown: {
          requirementFit: 95,
          quantityFit: 94,
          proximityFit: 93,
          capacitySafety: 92,
          urgencyFit: 91
        },
        address: "Plot 14, Sector 7 Relief Colony"
      }
    ]
  }
];
