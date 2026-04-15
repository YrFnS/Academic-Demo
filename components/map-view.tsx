'use client';

import React, { useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Book, Coffee, Building, Clock } from 'lucide-react';

export const CAMPUS_LOCATIONS = [
  { id: 1, name: 'College of Science', type: 'academic', lat: 33.2715, lng: 44.3791, icon: Book, description: 'Home to the departments of Physics, Chemistry, Biology, and Mathematics. Features state-of-the-art laboratories.', hours: '8:00 AM - 4:00 PM' },
  { id: 2, name: 'Main Library', type: 'academic', lat: 33.2730, lng: 44.3770, icon: Book, description: 'The central hub for research and study, offering millions of physical and digital resources, quiet study zones, and collaborative spaces.', hours: '8:00 AM - 8:00 PM' },
  { id: 3, name: 'Student Center & Cafeteria', type: 'facility', lat: 33.2690, lng: 44.3800, icon: Coffee, description: 'The heart of student life. Includes multiple dining options, recreation areas, student club offices, and a large lounge.', hours: '7:00 AM - 9:00 PM' },
  { id: 4, name: 'Administration Building', type: 'admin', lat: 33.2705, lng: 44.3781, icon: Building, description: 'Houses the university presidency, registrar, financial aid, and international student offices.', hours: '8:00 AM - 2:00 PM' },
  { id: 5, name: 'College of Engineering', type: 'academic', lat: 33.2685, lng: 44.3750, icon: Book, description: 'Offers programs in Civil, Mechanical, Electrical, and Computer Engineering. Includes heavy machinery labs and workshops.', hours: '8:00 AM - 5:00 PM' },
];

export type CampusLocation = typeof CAMPUS_LOCATIONS[0];

interface MapViewProps {
  activeFilter: string;
  selectedLocation: CampusLocation | null;
  onSelectLocation: (loc: CampusLocation | null) => void;
  onMapLoad: (event: any) => void;
}

export default function MapView({ activeFilter, selectedLocation, onSelectLocation, onMapLoad }: MapViewProps) {
  useEffect(() => {
    if (maplibregl.getRTLTextPluginStatus() === 'unavailable') {
      maplibregl.setRTLTextPlugin(
        'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
        true
      );
    }
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: 44.3781,
        latitude: 33.2705,
        zoom: 16,
        pitch: 60,
        bearing: -15,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      onLoad={onMapLoad}
      attributionControl={false}
    >
      <NavigationControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />

      {CAMPUS_LOCATIONS.filter(loc => activeFilter === 'all' || loc.type === activeFilter).map(loc => (
        <Marker
          key={loc.id}
          longitude={loc.lng}
          latitude={loc.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            onSelectLocation(loc);
          }}
        >
          <div className="flex flex-col items-center group cursor-pointer animate-bounce-slow">
            <div className="bg-oxford-blue/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:-translate-y-1 whitespace-nowrap mb-3 border border-white/10">
              {loc.name}
            </div>
            <div className="relative">
              <div className={`absolute inset-0 rounded-full animate-ping opacity-50 ${
                loc.type === 'academic' ? 'bg-academic-gold' :
                loc.type === 'facility' ? 'bg-emerald-500' : 'bg-blue-500'
              }`}></div>
              <div className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-4 border-white transition-transform group-hover:scale-110 ${
                loc.type === 'academic' ? 'bg-academic-gold text-oxford-blue' :
                loc.type === 'facility' ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'
              }`}>
                <loc.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="w-3 h-1.5 bg-black/30 rounded-full mt-2 blur-[2px]"></div>
          </div>
        </Marker>
      ))}

      {selectedLocation && (
        <Popup
          longitude={selectedLocation.lng}
          latitude={selectedLocation.lat}
          anchor="bottom"
          offset={60}
          onClose={() => onSelectLocation(null)}
          closeOnClick={false}
          className="z-50"
          maxWidth="320px"
        >
          <div className="p-1">
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                selectedLocation.type === 'academic' ? 'bg-academic-gold/20 text-academic-gold' :
                selectedLocation.type === 'facility' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-blue-600/20 text-blue-600'
              }`}>
                <selectedLocation.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight pr-4">{selectedLocation.name}</h3>
                <p className="text-xs text-slate-500 capitalize mt-0.5">{selectedLocation.type}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{selectedLocation.description}</p>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
              <Clock className="w-4 h-4 text-slate-400" />
              {selectedLocation.hours}
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
