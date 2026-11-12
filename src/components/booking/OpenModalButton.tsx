"use client";

import React from "react";
import { useBookingModal, type BookingPrefill } from "@/context/BookingModalContext";

export function OpenModalButton({
  prefill,
  className,
  children,
}: {
  prefill?: BookingPrefill;
  className?: string;
  children: React.ReactNode;
}) {
  const { openBookingModal } = useBookingModal();
  return (
    <button
      type="button"
      onClick={() => openBookingModal(prefill)}
      className={className}
    >
      {children}
    </button>
  );
}
