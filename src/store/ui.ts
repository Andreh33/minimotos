"use client";

import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  menuOpen: boolean;
  /** pulso para animar el blip del gauge al añadir al carrito */
  cartPing: number;
  openCart: () => void;
  closeCart: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  pingCart: () => void;
}

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  menuOpen: false,
  cartPing: 0,
  openCart: () => set({ cartOpen: true, menuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
  pingCart: () => set((s) => ({ cartPing: s.cartPing + 1 })),
}));
