"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AddToCartInput, CartLineItem } from "@/lib/cart-types";

const STORAGE_KEY = "handcrafted-haven-cart-v1";

type CartContextValue = {
  items: CartLineItem[];
  hydrated: boolean;
  itemCount: number;
  subtotalCents: number;
  addItem: (input: AddToCartInput) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setItems(parsed as CartLineItem[]);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* quota / private mode */
    }
  }, [items, hydrated]);

  const addItem = useCallback((input: AddToCartInput) => {
    const qty = input.quantity ?? 1;
    const addQty = Math.min(99, Math.max(1, Math.floor(qty)));
    setItems((prev) => {
      const idx = prev.findIndex((l) => l.productId === input.productId);
      if (idx >= 0) {
        const next = [...prev];
        const merged = next[idx].quantity + addQty;
        next[idx] = {
          ...next[idx],
          quantity: Math.min(99, merged),
        };
        return next;
      }
      const { quantity: _q, ...rest } = input;
      return [
        ...prev,
        {
          ...rest,
          quantity: addQty,
        },
      ];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.floor(quantity);
    if (q < 1) {
      setItems((prev) => prev.filter((l) => l.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((l) =>
        l.productId === productId ? { ...l, quantity: Math.min(99, q) } : l,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((acc, l) => acc + l.quantity, 0),
    [items],
  );

  const subtotalCents = useMemo(
    () => items.reduce((acc, l) => acc + l.priceCents * l.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      hydrated,
      itemCount,
      subtotalCents,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      hydrated,
      itemCount,
      subtotalCents,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
