"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface BookingPrefill {
  careMode?: string;
  specialty?: string;
  conditionOrPain?: string;
  locality?: string;
  source?: string;
}

interface BookingModalContextValue {
  isOpen: boolean;
  prefill: BookingPrefill;
  openBookingModal: (initial?: BookingPrefill) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | undefined>(
  undefined
);

export function BookingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const openBookingModal = useCallback((initial?: BookingPrefill) => {
    setPrefill(initial || {});
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingModalContext.Provider
      value={{ isOpen, prefill, openBookingModal, closeBookingModal }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}
