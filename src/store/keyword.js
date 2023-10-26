import { create } from "zustand";

export const useKeywordStore = create((set, get) => ({
  locations: [],
  platforms: [],
  addLocation: (location) => {
    set({ locations: [...get().locations, location] });
  },
  removeLocation: (removeItem) => {
    let locations = [...get().locations].filter(
      (item) => item !== removeItem
    );
    set({ locations: locations });
  },
  addPlatform: (platform) => {
    set({ platforms: [...get().platforms, platform] });
  },
  removePlatform: (removeItem) => {
    let platforms = [...get().locations].filter(
      (item) => item !== removeItem
    );
    set({ platforms: platforms });
  },
}));
