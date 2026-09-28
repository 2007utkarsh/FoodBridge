import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_FOOD_SOURCE_INVENTORY } from '../data/foodSourceInventoryData';
import { INITIAL_MY_SURPLUS } from '../data/mySurplusData';
import { INITIAL_INVENTORY } from '../data/inventoryData';
import { INITIAL_SURPLUS_ANALYSIS } from '../data/surplusAnalysisData';
import { INITIAL_MATCHING_POOL } from '../data/matchingData';
import { INITIAL_REDISTRIBUTIONS } from '../data/redistributionData';
import { IMPACT_CORE_METRICS } from '../data/sustainabilityData';
import { FACILITY_LOCATIONS, ACTIVE_ROUTES } from '../data/logisticsData';
import { INITIAL_LISTINGS, INITIAL_ORDERS, INITIAL_PICKUPS } from '../data/mockData';

const FoodBridgeContext = createContext();

export function FoodBridgeProvider({ children }) {
  // 1. Role State: 'food-source' | 'ngo' | 'admin'
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('fb_user_role') || 'food-source';
  });

  // 2. Navigation State across the Food Source workflow + all platform pages
  const [currentView, setCurrentView] = useState('landing');

  // Step 3 Food Source States
  const [foodSourceInventory, setFoodSourceInventory] = useState(() => {
    const saved = localStorage.getItem('fb_source_inventory');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_SOURCE_INVENTORY;
  });

  const [mySurplusList, setMySurplusList] = useState(() => {
    const saved = localStorage.getItem('fb_my_surplus');
    return saved ? JSON.parse(saved) : INITIAL_MY_SURPLUS;
  });

  // State to hold prefilled item when navigating from Inventory to Register Surplus
  const [prefillSurplusItem, setPrefillSurplusItem] = useState(null);

  // State for the recently registered surplus item to display in the Success Confirmation
  const [lastRegisteredSurplus, setLastRegisteredSurplus] = useState(null);

  // Other shared data stores
  const [selectedFoodItem, setSelectedFoodItem] = useState(INITIAL_INVENTORY[0]);
  const [selectedMatchingSurplus, setSelectedMatchingSurplus] = useState(INITIAL_MATCHING_POOL[0]);
  const [selectedRedistributionId, setSelectedRedistributionId] = useState('RED-501');

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('fb_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [surplusAnalysis, setSurplusAnalysis] = useState(() => {
    const saved = localStorage.getItem('fb_surplus_analysis');
    return saved ? JSON.parse(saved) : INITIAL_SURPLUS_ANALYSIS;
  });

  const [matchingPool, setMatchingPool] = useState(() => {
    const saved = localStorage.getItem('fb_matching_pool');
    return saved ? JSON.parse(saved) : INITIAL_MATCHING_POOL;
  });

  const [redistributions, setRedistributions] = useState(() => {
    const saved = localStorage.getItem('fb_redistributions');
    return saved ? JSON.parse(saved) : INITIAL_REDISTRIBUTIONS;
  });

  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem('fb_impact_metrics');
    return saved ? JSON.parse(saved) : IMPACT_CORE_METRICS;
  });

  // Legacy mappings for backward compatibility
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('fb_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('fb_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [pickups, setPickups] = useState(() => {
    const saved = localStorage.getItem('fb_pickups');
    return saved ? JSON.parse(saved) : INITIAL_PICKUPS;
  });

  // IoT Sensors Telemetry
  const [iotSensors, setIotSensors] = useState({
    coldRoomTemp: 3.8,
    hotHoldingTemp: 64.5,
    relativeHumidity: 68,
    ethyleneGasPpm: 0.12,
    methaneTvocPpm: 0.08,
    compressorPowerKw: 4.2,
    status: 'OPTIMAL'
  });

  // Modals & Notifications
  const [feasibilityModalOpen, setFeasibilityModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fb_user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('fb_source_inventory', JSON.stringify(foodSourceInventory));
  }, [foodSourceInventory]);

  useEffect(() => {
    localStorage.setItem('fb_my_surplus', JSON.stringify(mySurplusList));
  }, [mySurplusList]);

  useEffect(() => {
    localStorage.setItem('fb_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('fb_redistributions', JSON.stringify(redistributions));
  }, [redistributions]);

  useEffect(() => {
    localStorage.setItem('fb_impact_metrics', JSON.stringify(metrics));
  }, [metrics]);

  // Navigation Helper
  const navigateTo = (view, params = {}) => {
    if (params.foodItem) {
      setSelectedFoodItem(params.foodItem);
    }
    if (params.prefillItem) {
      setPrefillSurplusItem(params.prefillItem);
    }
    if (params.surplusId) {
      const match = matchingPool.find(m => m.surplusId === params.surplusId);
      if (match) setSelectedMatchingSurplus(match);
    }
    if (params.redistributionId) {
      setSelectedRedistributionId(params.redistributionId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * STEP 3: Register Surplus Food from Food Source
   * Status Flow:
   * Inventory → Surplus Detected → Registered → Available for Matching → Waiting for NGO Match
   */
  const registerSurplusFood = (formData) => {
    const newId = `SURP-${Date.now().toString().slice(-4)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newSurplusRecord = {
      id: newId,
      foodName: formData.foodName || 'Cooked Rice',
      foodCategory: formData.foodCategory || 'Grain',
      quantity: Number(formData.quantity) || 30,
      unit: formData.unit || 'kg',
      postedAt: `Today ${nowTime}`,
      prepTime: formData.prepTime || '6:00 PM',
      availableUntil: formData.availableUntil || '10:00 PM',
      pickupRequired: formData.pickupRequired || 'Required',
      location: formData.location || 'ABC Institutional Kitchen',
      status: 'Available',
      matchingStatus: 'Waiting for Match',
      additionalNotes: formData.additionalNotes || ''
    };

    // Add to My Surplus state
    setMySurplusList(prev => [newSurplusRecord, ...prev]);

    // Set last registered surplus for confirmation screen
    setLastRegisteredSurplus(newSurplusRecord);

    // Update global metrics
    setMetrics(prev => ({
      ...prev,
      foodRescuedKg: prev.foodRescuedKg + newSurplusRecord.quantity
    }));

    showToast(`Surplus Food Registered Successfully: ${newSurplusRecord.foodName} (${newSurplusRecord.quantity} ${newSurplusRecord.unit})`, 'success');
  };

  // Reset demo
  const resetDemoData = () => {
    setFoodSourceInventory(INITIAL_FOOD_SOURCE_INVENTORY);
    setMySurplusList(INITIAL_MY_SURPLUS);
    setInventory(INITIAL_INVENTORY);
    setSurplusAnalysis(INITIAL_SURPLUS_ANALYSIS);
    setMatchingPool(INITIAL_MATCHING_POOL);
    setRedistributions(INITIAL_REDISTRIBUTIONS);
    setMetrics(IMPACT_CORE_METRICS);
    setPrefillSurplusItem(null);
    setLastRegisteredSurplus(null);
    localStorage.clear();
    showToast('Platform reset to initial Food Source demo state.', 'info');
  };

  return (
    <FoodBridgeContext.Provider
      value={{
        // Role & Views
        userRole,
        setUserRole,
        currentView,
        navigateTo,

        // Step 3 Food Source Workflow Stores & Methods
        foodSourceInventory,
        setFoodSourceInventory,
        mySurplusList,
        setMySurplusList,
        prefillSurplusItem,
        setPrefillSurplusItem,
        lastRegisteredSurplus,
        setLastRegisteredSurplus,
        registerSurplusFood,

        // Platform entities
        selectedFoodItem,
        setSelectedFoodItem,
        selectedMatchingSurplus,
        setSelectedMatchingSurplus,
        selectedRedistributionId,
        setSelectedRedistributionId,
        inventory,
        surplusAnalysis,
        matchingPool,
        redistributions,
        metrics,
        facilities: FACILITY_LOCATIONS,
        activeRoutes: ACTIVE_ROUTES,

        // Reset demo
        resetDemoData,

        // UI & Modals
        iotSensors,
        setIotSensors,
        feasibilityModalOpen,
        setFeasibilityModalOpen,
        toast,
        showToast,

        // Legacy compat
        listings,
        orders,
        pickups
      }}
    >
      {children}
    </FoodBridgeContext.Provider>
  );
}

export function useFoodBridge() {
  const context = useContext(FoodBridgeContext);
  if (!context) {
    throw new Error('useFoodBridge must be used within a FoodBridgeProvider');
  }
  return context;
}
