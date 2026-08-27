import { create } from 'zustand';

export const useMapStore = create((set) => ({
  layers: {
    forest: true,
    wildlife: true,
    water: true,
    roads: true,
    settlements: true,
    agriculture: true,
    habitatQuality: true,
    conflictRisk: true,
    corridors: true,
  },
  selectedSpecies: 'ALL',
  selectedCorridor: null,
  activeTab: 'layers',

  toggleLayer: (layerKey) =>
    set((state) => ({
      layers: { ...state.layers, [layerKey]: !state.layers[layerKey] },
    })),

  setSelectedSpecies: (species) => set({ selectedSpecies: species }),
  setSelectedCorridor: (corridor) => set({ selectedCorridor: corridor }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
