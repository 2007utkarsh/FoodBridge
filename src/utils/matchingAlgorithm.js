/**
 * AI-Based Recipient Matching Algorithm Prototype
 * Evaluates multi-criteria compatibility for surplus food redistribution:
 * 1. Food requirement compatibility (w1 = 0.25)
 * 2. Quantity compatibility (w2 = 0.20)
 * 3. Distance / Proximity (w3 = 0.25)
 * 4. Recipient capacity & beneficiary absorption rate (w4 = 0.15)
 * 5. Time urgency & safe shelf-life window (w5 = 0.15)
 *
 * Explicitly labeled: "AI-based matching prototype"
 */

export function calculateMatchScore(surplus, recipient) {
  // 1. Food Requirement Compatibility (0 - 100)
  // Check category and dietary alignment
  let requirementScore = 90;
  if (recipient.dietaryMatch) {
    requirementScore = parseInt(recipient.dietaryMatch, 10) || 90;
  }

  // 2. Quantity Compatibility (0 - 100)
  // Closer surplus quantity is to recipient demand without exceeding capacity
  const surplusQty = Number(surplus.surplusQty || surplus.quantity || 30);
  const requiredQty = Number(recipient.requiredQty || 25);
  const capacityQty = Number(recipient.capacityQty || 40);

  let quantityScore = 80;
  if (surplusQty <= capacityQty) {
    const ratio = Math.min(surplusQty, requiredQty) / Math.max(surplusQty, requiredQty);
    quantityScore = Math.round(75 + ratio * 25);
  } else {
    // Exceeds recipient storage capacity
    quantityScore = Math.max(40, Math.round(100 - ((surplusQty - capacityQty) / capacityQty) * 100));
  }

  // 3. Proximity / Distance Score (0 - 100)
  // Higher score for closer distance (< 3km is ideal for hot cooked food)
  const distanceKm = recipient.distanceKm || 3.0;
  let proximityScore = 100;
  if (distanceKm <= 2.5) {
    proximityScore = Math.round(95 - distanceKm * 2);
  } else if (distanceKm <= 6.0) {
    proximityScore = Math.round(90 - (distanceKm - 2.5) * 6);
  } else {
    proximityScore = Math.max(30, Math.round(65 - (distanceKm - 6.0) * 5));
  }

  // 4. Capacity & Absorption Readiness (0 - 100)
  const capacityScore = recipient.beneficiaries > 150 ? 92 : recipient.beneficiaries > 60 ? 80 : 65;

  // 5. Time Urgency Score (0 - 100)
  // Cooked food has short window; nearby NGOs get bonus
  const isUrgent = (surplus.urgency === 'Urgent') || (surplus.status === 'Urgent');
  let urgencyScore = isUrgent ? (distanceKm < 3.5 ? 94 : 70) : 85;

  // Weighted sum
  const weightedTotal = Math.round(
    requirementScore * 0.25 +
    quantityScore * 0.20 +
    proximityScore * 0.25 +
    capacityScore * 0.15 +
    urgencyScore * 0.15
  );

  const finalScore = Math.min(99, Math.max(50, weightedTotal));

  return {
    finalScore,
    isRecommended: finalScore >= 85,
    breakdown: {
      requirementFit: requirementScore,
      quantityFit: quantityScore,
      proximityFit: proximityScore,
      capacitySafety: capacityScore,
      urgencyFit: urgencyScore
    },
    prototypeNote: "AI-based matching prototype: Multimodal heuristic weighted ranker"
  };
}

/**
 * Rank an array of recipient NGOs against a given surplus lot
 */
export function rankRecipients(surplusItem, recipientsList) {
  const ranked = recipientsList.map(recipient => {
    const scoreResult = calculateMatchScore(surplusItem, recipient);
    return {
      ...recipient,
      matchScore: scoreResult.finalScore,
      isRecommended: scoreResult.isRecommended,
      scoreBreakdown: scoreResult.breakdown,
      algorithmTag: scoreResult.prototypeNote
    };
  });

  return ranked.sort((a, b) => b.matchScore - a.matchScore);
}
