/**
 * API Service Layer (Backend Abstraction)
 * Designed to mirror future FastAPI / MongoDB microservices.
 * In this prototype phase, resolves data asynchronously from the data layer.
 * Switching to live backend requires only updating API_BASE_URL and un-mocking the fetch calls.
 */

import { INITIAL_INVENTORY } from '../data/inventoryData';
import { INITIAL_SURPLUS_ANALYSIS } from '../data/surplusAnalysisData';
import { INITIAL_MATCHING_POOL } from '../data/matchingData';
import { INITIAL_REDISTRIBUTIONS } from '../data/redistributionData';
import { IMPACT_CORE_METRICS, WEEKLY_TREND_DATA, CATEGORY_BREAKDOWN } from '../data/sustainabilityData';
import { FACILITY_LOCATIONS, ACTIVE_ROUTES } from '../data/logisticsData';

const SIMULATED_LATENCY_MS = 150;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ApiService = {
  // 1. Inventory & Surplus Detection
  async getInventory() {
    await delay(SIMULATED_LATENCY_MS);
    const local = localStorage.getItem('ps26234_inventory');
    return local ? JSON.parse(local) : INITIAL_INVENTORY;
  },

  async addInventoryItem(item) {
    await delay(SIMULATED_LATENCY_MS);
    const current = await this.getInventory();
    const newItem = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      ...item,
      surplusQty: Math.max(0, Number(item.availableQty || 0) - Number(item.requiredQty || 0)),
      status: Number(item.availableQty) > Number(item.requiredQty) ? 'Surplus' : 'Normal'
    };
    const updated = [newItem, ...current];
    localStorage.setItem('ps26234_inventory', JSON.stringify(updated));
    return newItem;
  },

  // 2. Smart Surplus Analysis
  async getSurplusAnalysis() {
    await delay(SIMULATED_LATENCY_MS);
    return INITIAL_SURPLUS_ANALYSIS;
  },

  // 3. AI Matching Pool
  async getMatchingPool() {
    await delay(SIMULATED_LATENCY_MS);
    return INITIAL_MATCHING_POOL;
  },

  // 4. Redistribution & Handover Lifecycle
  async getRedistributions() {
    await delay(SIMULATED_LATENCY_MS);
    const local = localStorage.getItem('ps26234_redistributions');
    return local ? JSON.parse(local) : INITIAL_REDISTRIBUTIONS;
  },

  async updateRedistributionStage(id, newStage, newStatus) {
    await delay(SIMULATED_LATENCY_MS);
    const all = await this.getRedistributions();
    const updated = all.map(r => {
      if (r.id === id) {
        return {
          ...r,
          stage: newStage,
          status: newStatus
        };
      }
      return r;
    });
    localStorage.setItem('ps26234_redistributions', JSON.stringify(updated));
    return updated.find(r => r.id === id);
  },

  async createRedistribution(claimPayload) {
    await delay(SIMULATED_LATENCY_MS);
    const all = await this.getRedistributions();
    const newRed = {
      id: `RED-${Date.now().toString().slice(-4)}`,
      foodItem: claimPayload.foodItem || 'Cooked Basmati Rice',
      quantity: claimPayload.quantity || '30 kg',
      sourceFacility: claimPayload.sourceFacility || 'Apex Institutional Kitchen',
      sourceContact: 'Chef Arvind Sharma (+91 98101 22334)',
      recipientNgo: claimPayload.recipientName || 'Hope Food Bank',
      recipientContact: claimPayload.recipientContact || 'Coordinator (+91 97110 55432)',
      status: 'Accepted',
      stage: 3,
      matchScore: claimPayload.matchScore || 91,
      availableUntil: claimPayload.availableUntil || 'Tonight, 10:00 PM',
      transportMode: 'Thermal Insulated Van',
      pinCode: String(Math.floor(1000 + Math.random() * 9000)),
      timestamps: {
        availableAt: 'Today, 13:30',
        requestedAt: 'Today, 14:15',
        acceptedAt: 'Just now',
        pickupAssignedAt: 'Pending dispatch',
        pickedUpAt: '--',
        deliveredAt: '--'
      },
      coordinates: {
        source: [28.6280, 77.2150],
        destination: [28.5800, 77.2300]
      }
    };
    const updated = [newRed, ...all];
    localStorage.setItem('ps26234_redistributions', JSON.stringify(updated));
    return newRed;
  },

  // 5. Sustainability Metrics
  async getSustainabilityMetrics() {
    await delay(SIMULATED_LATENCY_MS);
    return {
      metrics: IMPACT_CORE_METRICS,
      weeklyTrends: WEEKLY_TREND_DATA,
      categories: CATEGORY_BREAKDOWN
    };
  },

  // 6. Logistics & OpenStreetMap
  async getLogisticsData() {
    await delay(SIMULATED_LATENCY_MS);
    return {
      facilities: FACILITY_LOCATIONS,
      activeRoutes: ACTIVE_ROUTES
    };
  }
};
