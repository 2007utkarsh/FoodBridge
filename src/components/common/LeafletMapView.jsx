import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

/**
 * Reusable Leaflet OpenStreetMap View
 * Uses custom SVG DivIcons to guarantee zero missing marker PNG issues in Vite/React.
 * Supports multi-source markers, NGO markers, vehicle markers, and route polylines.
 */
export default function LeafletMapView({
  center = [28.6139, 77.2090],
  zoom = 13,
  height = '420px',
  sources = [],
  ngos = [],
  activeRoutes = [],
  selectedRouteId = null,
  onMarkerClick = null
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  // Initialize Map Once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Attribution small control
      L.control.attribution({ position: 'bottomright', prefix: false })
        .addAttribution('OpenStreetMap | FoodBridge PS26234')
        .addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Layers when props change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layers = layerGroupRef.current;
    if (!map || !layers) return;

    layers.clearLayers();
    const bounds = L.latLngBounds([]);

    // 1. Render Food Sources (Green Markers)
    sources.forEach(src => {
      if (!src.coordinates) return;
      const [lat, lng] = src.coordinates;
      bounds.extend([lat, lng]);

      const sourceIcon = L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ring-4 ring-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v20"/><path d="M6 2v20"/><path d="M12 2v20"/></svg>
            </div>
            <div class="absolute -bottom-1 w-2 h-2 bg-emerald-600 rotate-45"></div>
          </div>
        `,
        iconSize: [32, 36],
        iconAnchor: [16, 36],
        popupAnchor: [0, -36]
      });

      const marker = L.marker([lat, lng], { icon: sourceIcon });
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 180px;">
          <div style="font-size: 9px; font-weight: bold; color: #059669; text-transform: uppercase; letter-spacing: 0.5px;">Food Source Hub</div>
          <div style="font-weight: 700; color: #0f172a; margin-top: 2px;">${src.name}</div>
          <div style="color: #64748b; font-size: 11px;">${src.type || 'Institutional Kitchen'}</div>
          ${src.activeSurplusKg ? `<div style="margin-top: 6px; padding: 3px 6px; background: #ecfdf5; border-radius: 4px; color: #047857; font-weight: 600;">Surplus Ready: ${src.activeSurplusKg} kg</div>` : ''}
          ${src.phone ? `<div style="margin-top: 4px; color: #475569; font-size: 11px;">📞 ${src.phone}</div>` : ''}
        </div>
      `);
      marker.addTo(layers);
    });

    // 2. Render Recipient NGOs (Teal/Blue Markers)
    ngos.forEach(ngo => {
      if (!ngo.coordinates) return;
      const [lat, lng] = ngo.coordinates;
      bounds.extend([lat, lng]);

      const ngoIcon = L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-teal-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ring-4 ring-teal-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <div class="absolute -bottom-1 w-2 h-2 bg-teal-600 rotate-45"></div>
          </div>
        `,
        iconSize: [32, 36],
        iconAnchor: [16, 36],
        popupAnchor: [0, -36]
      });

      const marker = L.marker([lat, lng], { icon: ngoIcon });
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 180px;">
          <div style="font-size: 9px; font-weight: bold; color: #0d9488; text-transform: uppercase; letter-spacing: 0.5px;">Verified Recipient NGO</div>
          <div style="font-weight: 700; color: #0f172a; margin-top: 2px;">${ngo.name}</div>
          <div style="color: #64748b; font-size: 11px;">${ngo.type || 'Community Shelter'}</div>
          ${ngo.dailyCapacityKg ? `<div style="margin-top: 6px; padding: 3px 6px; background: #f0fdfa; border-radius: 4px; color: #0f766e; font-weight: 600;">Daily Capacity: ${ngo.dailyCapacityKg} kg</div>` : ''}
          ${ngo.currentOccupancy ? `<div style="color: #64748b; font-size: 10px; margin-top: 2px;">Demand: ${ngo.currentOccupancy}</div>` : ''}
        </div>
      `);
      marker.addTo(layers);
    });

    // 3. Render Route Polylines and In-Transit Vehicles
    activeRoutes.forEach(route => {
      const isSelected = selectedRouteId ? route.id === selectedRouteId : true;

      if (route.waypoints && route.waypoints.length > 0) {
        route.waypoints.forEach(wp => bounds.extend(wp));

        // Background casing polyline
        L.polyline(route.waypoints, {
          color: '#ffffff',
          weight: 6,
          opacity: 0.9
        }).addTo(layers);

        // Core route polyline
        const polyline = L.polyline(route.waypoints, {
          color: isSelected ? '#10b981' : '#94a3b8',
          weight: isSelected ? 4 : 3,
          dashArray: isSelected ? null : '6, 6',
          opacity: 0.95
        }).addTo(layers);

        polyline.bindPopup(`
          <div style="font-family: inherit; font-size: 12px;">
            <div style="font-weight: bold; color: #065f46;">Redistribution Route: ${route.title || 'In Transit'}</div>
            <div style="font-size: 11px; color: #475569; margin-top: 4px;">
              <b>Distance:</b> ${route.distanceKm || '2.4'} km &bull; <b>ETA:</b> ${route.travelTimeMins || '18'} mins
            </div>
            <div style="font-size: 11px; color: #047857; margin-top: 2px;">
              <b>Vehicle:</b> ${route.driver?.vehicle || 'Insulated Van'}
            </div>
          </div>
        `);
      }

      // Live In-transit Vehicle Marker
      if (route.currentLocation) {
        const [vLat, vLng] = route.currentLocation;
        bounds.extend([vLat, vLng]);

        const vehicleIcon = L.divIcon({
          className: 'custom-vehicle-icon',
          html: `
            <div class="relative flex items-center justify-center">
              <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-75"></span>
              <div class="w-8 h-8 rounded-full bg-amber-500 border-2 border-white shadow-xl flex items-center justify-center text-white font-bold text-xs relative z-10 ring-4 ring-amber-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18]
        });

        const vMarker = L.marker([vLat, vLng], { icon: vehicleIcon });
        vMarker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; min-width: 170px;">
            <div style="font-size: 9px; font-weight: bold; color: #d97706; text-transform: uppercase;">Active Transit Vehicle</div>
            <div style="font-weight: 700; color: #0f172a; margin-top: 2px;">${route.driver?.vehicle || 'Delivery Unit'}</div>
            <div style="font-size: 11px; color: #64748b;">Driver: ${route.driver?.name || 'Assigned Driver'}</div>
            ${route.driver?.currentTemp ? `<div style="margin-top: 4px; padding: 2px 6px; background: #fef3c7; color: #92400e; border-radius: 4px; font-size: 11px; font-weight: 600;">Temp: ${route.driver.currentTemp}</div>` : ''}
          </div>
        `);
        vMarker.addTo(layers);
      }
    });

    // Auto-fit bounds if elements exist
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [sources, ngos, activeRoutes, selectedRouteId]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      <div ref={mapContainerRef} style={{ width: '100%', height }} className="z-10" />

      {/* Floating Map Legend */}
      <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md text-[11px] font-semibold flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span className="text-slate-700">Food Source</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
          <span className="text-slate-700">NGO Recipient</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-700">Live Transport</span>
        </div>
      </div>
    </div>
  );
}
