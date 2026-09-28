/**
 * Redistribution & Handover Requests Data
 * Represents the 6-stage lifecycle:
 * Available → Requested → Accepted → Pickup Assigned → Picked Up → Delivered
 */

export const INITIAL_REDISTRIBUTIONS = [
  {
    id: "RED-501",
    foodItem: "Cooked Steamed Rice",
    quantity: "30 kg (~90 portions)",
    sourceFacility: "Apex Institutional Kitchen",
    sourceContact: "Chef Arvind Sharma (+91 98101 22334)",
    recipientNgo: "Hope Food Bank & Community Kitchen",
    recipientContact: "Anjali Verma (Coordinator, +91 97110 55432)",
    status: "Pickup Assigned",
    stage: 4, // 1 to 6
    matchScore: 91,
    availableUntil: "Tonight, 10:00 PM",
    transportMode: "Insulated Thermal Van (DL-04-C-8921)",
    pinCode: "5912",
    timestamps: {
      availableAt: "13:30 Today",
      requestedAt: "14:15 Today",
      acceptedAt: "14:28 Today",
      pickupAssignedAt: "14:45 Today",
      pickedUpAt: "Pending driver arrival",
      deliveredAt: "Est. 15:45 Today"
    },
    coordinates: {
      source: [28.6139, 77.2090],
      destination: [28.5800, 77.2300]
    },
    notes: "Hot food containers must be sealed; driver instructed to take Sector 7 arterial road."
  },
  {
    id: "RED-502",
    foodItem: "Mixed Seasonal Vegetables (Curry)",
    quantity: "15 kg (~45 portions)",
    sourceFacility: "Apex Institutional Kitchen",
    sourceContact: "Chef Arvind Sharma (+91 98101 22334)",
    recipientNgo: "Robin Hood Food Relief",
    recipientContact: "Vikas Saxena (+91 98205 99881)",
    status: "Accepted",
    stage: 3,
    matchScore: 89,
    availableUntil: "Tonight, 7:30 PM",
    transportMode: "Covered E-Rickshaw Cargo",
    pinCode: "3481",
    timestamps: {
      availableAt: "14:00 Today",
      requestedAt: "14:30 Today",
      acceptedAt: "14:42 Today",
      pickupAssignedAt: "Pending volunteer dispatch",
      pickedUpAt: "--",
      deliveredAt: "--"
    },
    coordinates: {
      source: [28.6139, 77.2090],
      destination: [28.5600, 77.1950]
    },
    notes: "Requires insulated transfer boxes."
  },
  {
    id: "RED-503",
    foodItem: "Whole Wheat Chapatis & Dal",
    quantity: "85 kg (~240 servings)",
    sourceFacility: "Grand Pavilion Banquet Services",
    sourceContact: "Vikram Oberoi (+91 98991 77412)",
    recipientNgo: "Asha Kiran Child Shelter",
    recipientContact: "Sister Maria (+91 98330 11200)",
    status: "Delivered",
    stage: 6,
    matchScore: 95,
    availableUntil: "Completed",
    transportMode: "Temperature-Controlled Van",
    pinCode: "8204",
    timestamps: {
      availableAt: "10:00 Today",
      requestedAt: "10:20 Today",
      acceptedAt: "10:35 Today",
      pickupAssignedAt: "10:50 Today",
      pickedUpAt: "11:25 Today",
      deliveredAt: "12:10 Today"
    },
    coordinates: {
      source: [28.5921, 77.1873],
      destination: [28.5450, 77.2100]
    },
    notes: "Handover signed by shelter director. Distributed to 240 children for lunch."
  },
  {
    id: "RED-504",
    foodItem: "Farm-Fresh Tomatoes & Bell Peppers",
    quantity: "45 kg bulk produce",
    sourceFacility: "Commissary Central Store",
    sourceContact: "Manish Gupta (+91 98711 00234)",
    recipientNgo: "Sanjeevani Care Home",
    recipientContact: "Dr. K. Swaminathan (+91 98205 99881)",
    status: "Picked Up",
    stage: 5,
    matchScore: 84,
    availableUntil: "Tomorrow, 4:00 PM",
    transportMode: "Mini Cargo Pickup Truck",
    pinCode: "1923",
    timestamps: {
      availableAt: "11:00 Today",
      requestedAt: "11:40 Today",
      acceptedAt: "12:00 Today",
      pickupAssignedAt: "12:20 Today",
      pickedUpAt: "13:15 Today",
      deliveredAt: "Est. 14:15 Today"
    },
    coordinates: {
      source: [28.6400, 77.2200],
      destination: [28.5700, 77.2400]
    },
    notes: "En route to community kitchen store."
  }
];
