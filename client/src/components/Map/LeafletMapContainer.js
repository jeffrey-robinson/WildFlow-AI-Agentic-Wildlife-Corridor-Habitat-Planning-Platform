import React from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { useMapStore } from '../../store/mapStore';
import { Compass } from 'lucide-react';

export default function LeafletMapContainer() {
  const { layers, selectedSpecies, selectedCorridor, setSelectedCorridor } = useMapStore();

  // Nilgiri Biosphere / Western Ghats Coordinates Centroid
  const position = [11.55, 76.55];

  const forestPolygons = [
    [
      [11.48, 76.32],
      [11.60, 76.32],
      [11.60, 76.45],
      [11.48, 76.45],
    ],
    [
      [11.62, 76.60],
      [11.76, 76.60],
      [11.76, 76.78],
      [11.62, 76.78],
    ],
  ];

  const waterBodies = [
    [11.58, 76.42],
    [11.64, 76.55],
    [11.50, 76.65],
  ];

  const roads = [
    [
      [11.45, 76.50],
      [11.55, 76.52],
      [11.65, 76.58],
      [11.75, 76.60],
    ],
  ];

  const villages = [
    { name: 'Masinagudi Settlement', coords: [11.53, 76.51] },
    { name: 'Moyar Buffer Village', coords: [11.60, 76.62] },
    { name: 'Gundlupet Border Sector', coords: [11.72, 76.68] },
  ];

  const wildlifePoints = [
    { species: 'Asian Elephant', type: 'GPS Telemetry Collar', coords: [11.52, 76.48], time: '10m ago' },
    { species: 'Asian Elephant', type: 'Camera Trap CT-12', coords: [11.58, 76.54], time: '1h ago' },
    { species: 'Bengal Tiger', type: 'Pugmark Footprint', coords: [11.64, 76.62], time: '3h ago' },
    { species: 'Indian Gaur', type: 'Direct Sight', coords: [11.55, 76.71], time: '5h ago' },
  ];

  const proposedCorridors = [
    {
      id: 'corridor-alpha',
      title: 'Corridor Alpha (Primary Riverine Passage)',
      coords: [
        [11.48, 76.38],
        [11.52, 76.46],
        [11.58, 76.58],
        [11.64, 76.66],
      ],
      score: 89,
      risk: 'Low (15%)',
      color: '#22c55e',
    },
    {
      id: 'corridor-beta',
      title: 'Corridor Beta (Northern Ridge Bypass)',
      coords: [
        [11.48, 76.38],
        [11.56, 76.42],
        [11.66, 76.60],
        [11.64, 76.66],
      ],
      score: 84,
      risk: 'Medium (25%)',
      color: '#38bdf8',
    },
    {
      id: 'corridor-gamma',
      title: 'Corridor Gamma (Southern Agriculture Link)',
      coords: [
        [11.48, 76.38],
        [11.46, 76.50],
        [11.58, 76.68],
        [11.64, 76.66],
      ],
      score: 68,
      risk: 'High (55%)',
      color: '#f59e0b',
    },
  ];

  return (
    <div className="w-full h-full relative">
      <MapContainer center={position} zoom={11} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> Dark Matter'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* 🌳 Forest Reserve Polygons */}
        {layers.forest &&
          forestPolygons.map((poly, idx) => (
            <Polygon
              key={`forest-${idx}`}
              positions={poly}
              pathOptions={{ color: '#16a34a', fillColor: '#22c55e', fillOpacity: 0.25, weight: 2 }}
            >
              <Popup>
                <div className="text-xs text-slate-900 font-sans p-1">
                  <strong className="block text-sm text-emerald-900">Forest Reserve Zone #{idx + 1}</strong>
                  <span>High Canopy NDVI: 0.82 • Core Elephant Habitat</span>
                </div>
              </Popup>
            </Polygon>
          ))}

        {/* 💧 Water Bodies */}
        {layers.water &&
          waterBodies.map((pt, idx) => (
            <CircleMarker
              key={`water-${idx}`}
              center={pt}
              radius={8}
              pathOptions={{ color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.7 }}
            >
              <Tooltip permanent direction="top" className="custom-map-tooltip">
                💧 Water Hole #{idx + 1}
              </Tooltip>
            </CircleMarker>
          ))}

        {/* 🚗 Roads */}
        {layers.roads &&
          roads.map((rd, idx) => (
            <Polyline
              key={`road-${idx}`}
              positions={rd}
              pathOptions={{ color: '#ef4444', weight: 4, dashArray: '6, 6' }}
            >
              <Popup>
                <div className="text-xs text-slate-900">
                  <strong>State Highway 17</strong>
                  <p>High Vehicular Collision Risk Zone</p>
                </div>
              </Popup>
            </Polyline>
          ))}

        {/* 🏘️ Villages */}
        {layers.settlements &&
          villages.map((v, idx) => (
            <CircleMarker
              key={`village-${idx}`}
              center={v.coords}
              radius={10}
              pathOptions={{ color: '#f59e0b', fillColor: '#fbbf24', fillOpacity: 0.6 }}
            >
              <Popup>
                <div className="text-xs text-slate-900">
                  <strong>{v.name}</strong>
                  <p>Buffer Conflict Mitigation Area</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* 🐘 Wildlife Sightings */}
        {layers.wildlife &&
          wildlifePoints.map((pt, idx) => {
            if (selectedSpecies !== 'ALL' && pt.species !== selectedSpecies) return null;
            return (
              <CircleMarker
                key={`sight-${idx}`}
                center={pt.coords}
                radius={7}
                pathOptions={{ color: '#a855f7', fillColor: '#c084fc', fillOpacity: 0.9 }}
              >
                <Popup>
                  <div className="text-xs text-slate-900 font-semibold">
                    <span>🐘 {pt.species}</span>
                    <p className="text-[10px] text-slate-600 font-normal">
                      Method: {pt.type} ({pt.time})
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

        {/* 🟡 Proposed Corridors */}
        {layers.corridors &&
          proposedCorridors.map((c) => (
            <Polyline
              key={c.id}
              positions={c.coords}
              pathOptions={{ color: c.color, weight: 6, opacity: 0.85 }}
              eventHandlers={{
                click: () => setSelectedCorridor(c),
              }}
            >
              <Popup>
                <div className="text-xs text-slate-900 font-sans p-1">
                  <strong className="block text-emerald-950 font-extrabold">{c.title}</strong>
                  <div className="mt-1 space-y-0.5 text-[11px]">
                    <div>Suitability Score: <span className="font-bold text-emerald-700">{c.score}/100</span></div>
                    <div>Human Risk: <span className="font-bold text-amber-700">{c.risk}</span></div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          ))}
      </MapContainer>

      {/* Selected Corridor Legend */}
      {selectedCorridor && (
        <div className="absolute bottom-4 right-4 z-20 bg-[#0d1711]/95 border border-emerald-700/50 p-4 rounded-2xl shadow-2xl max-w-sm text-xs space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-emerald-300 flex items-center space-x-1.5">
              <Compass className="w-4 h-4" />
              <span>{selectedCorridor.title}</span>
            </h4>
            <button onClick={() => setSelectedCorridor(null)} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px]">
            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Suitability</span>
              <span className="text-emerald-400 font-bold text-sm">{selectedCorridor.score}/100</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Human Risk</span>
              <span className="text-amber-400 font-bold text-sm">{selectedCorridor.risk}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
