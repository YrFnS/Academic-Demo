'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Info, Layers } from 'lucide-react';
import type { CampusLocation } from '@/components/map-view';

// Dynamically import the heavy map component - keeps maplibre-gl out of initial bundle
const MapView = dynamic(() => import('@/components/map-view'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 animate-pulse">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-academic-gold animate-spin" />
        <p className="text-sm font-medium">Loading map...</p>
      </div>
    </div>
  ),
});

export default function CampusMapPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);


  const onMapLoad = useCallback((event: any) => {
    const map = event.target;
    
    // Attempt to add 3D buildings if the source supports it
    try {
      const layers = map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // Carto Positron uses 'carto' as the source name
      map.addLayer(
        {
          id: '3d-buildings',
          source: 'carto',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            // Solid buildings with soft colors to prevent overlapping transparency artifacts
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['coalesce', ['get', 'render_height'], ['get', 'height'], 6],
              0, '#ffffff',
              15, '#f8fafc',
              40, '#f1f5f9'
            ],
            'fill-extrusion-height': [
              'interpolate', ['linear'], ['zoom'],
              14, 0,
              14.05, ['coalesce', ['get', 'render_height'], ['get', 'height'], 6] // Lower default height for generic buildings
            ],
            'fill-extrusion-base': [
              'interpolate', ['linear'], ['zoom'],
              14, 0,
              14.05, ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0]
            ],
            'fill-extrusion-opacity': 1 // Solid to prevent seeing roads/water through buildings
          }
        },
        labelLayerId
      );

      // Soften the 3D lighting for a more premium, studio-lit appearance
      if (map.setLight) {
        map.setLight({
          anchor: 'viewport',
          color: '#ffffff',
          intensity: 0.15, // Even softer lighting
          position: [1.5, 90, 60]
        });
      }
    } catch (e) {
      console.log('3D buildings not supported by this tile source or already added.');
    }
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] w-full relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100">

      {/* Floating UI Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/50 pointer-events-auto max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-academic-gold" />
            Interactive Campus Map
          </h1>
          <p className="text-slate-500 text-sm flex items-center gap-2 mt-2">
            <Info className="w-4 h-4 shrink-0" />
            Hold Right-Click (or two fingers) and drag to rotate and tilt the 3D view.
          </p>
        </div>

        {/* Floating Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 pointer-events-auto bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-white/50">
          <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeFilter === 'all' ? 'bg-oxford-blue text-white shadow-md scale-105' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}>All</button>
          <button onClick={() => setActiveFilter('academic')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeFilter === 'academic' ? 'bg-academic-gold text-oxford-blue shadow-md scale-105' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}>Academic</button>
          <button onClick={() => setActiveFilter('facility')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeFilter === 'facility' ? 'bg-emerald-500 text-white shadow-md scale-105' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}>Facilities</button>
        </div>
      </div>

      {/* Dynamically loaded Map — maplibre-gl is only fetched when this page is visited */}
      <MapView
        activeFilter={activeFilter}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        onMapLoad={onMapLoad}
      />
    </div>
  );
}
