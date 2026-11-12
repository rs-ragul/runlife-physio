"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export function TouchAndNetworkFeedback() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const [statusLabel, setStatusLabel] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trickleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingElRef = useRef<HTMLElement | null>(null);

  function clearPendingState() {
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    if (trickleTimerRef.current) clearInterval(trickleTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    if (pendingElRef.current) {
      pendingElRef.current.removeAttribute("data-nav-pending");
      pendingElRef.current = null;
    }
  }

  // Complete progress bar whenever route pathname changes
  useEffect(() => {
    if (navigating) {
      clearPendingState();
      setProgress(100);
      setStatusLabel(null);
      const doneTimer = setTimeout(() => {
        setNavigating(false);
        setProgress(0);
      }, 240);
      return () => clearTimeout(doneTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, summary, [role='button']"
      ) as HTMLElement | null;
      if (!interactive) return;
      if ((interactive as HTMLButtonElement).disabled) return;

      // 1. Instant expanding tap ring right under user's finger
      const id = Date.now() + Math.random();
      setRipples((prev) => [
        ...prev.slice(-4),
        { id, x: e.clientX, y: e.clientY },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 450);

      // 2. Subtle micro-haptic pulse on supported Android devices
      if (
        e.pointerType === "touch" &&
        typeof navigator !== "undefined" &&
        "vibrate" in navigator
      ) {
        try {
          navigator.vibrate(6);
        } catch {
          // Ignore if blocked by browser policy
        }
      }
    }

    function handleClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href") || "";
      const targetAttr = anchor.getAttribute("target");

      // Brief feedback pill when opening Phone dialer or WhatsApp
      if (rawHref.startsWith("tel:")) {
        setStatusLabel("Opening Phone Dialer...");
        setTimeout(() => setStatusLabel(null), 1100);
        return;
      }
      if (rawHref.includes("wa.me/") || rawHref.includes("whatsapp.com")) {
        setStatusLabel("Opening WhatsApp...");
        setTimeout(() => setStatusLabel(null), 1200);
        return;
      }

      // Ignore hash jumps, mailto, downloads, or external new-tab links
      if (
        !rawHref ||
        targetAttr === "_blank" ||
        anchor.hasAttribute("download") ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("http://") ||
        rawHref.startsWith("https://")
      ) {
        return;
      }

      const nextUrl = new URL(rawHref, window.location.origin);
      if (
        nextUrl.origin !== window.location.origin ||
        nextUrl.pathname === window.location.pathname
      ) {
        return;
      }

      // Start immediate route-loading feedback
      clearPendingState();
      anchor.setAttribute("data-nav-pending", "true");
      pendingElRef.current = anchor;

      setNavigating(true);
      setProgress(26);

      trickleTimerRef.current = setInterval(() => {
        setProgress((prev) => (prev < 88 ? prev + (90 - prev) * 0.2 : prev));
      }, 160);

      // Show explicit floating "Loading..." pill if network takes > 120ms
      slowTimerRef.current = setTimeout(() => {
        setStatusLabel("Loading...");
      }, 120);

      // Safety fallback cleanup
      safetyTimerRef.current = setTimeout(() => {
        clearPendingState();
        setNavigating(false);
        setStatusLabel(null);
        setProgress(0);
      }, 8000);
    }

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("click", handleClick, true);
      clearPendingState();
    };
  }, []);

  return (
    <>
      {/* Instant Finger-Tap Visual Ripple Feedback */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[130] overflow-hidden"
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            style={{ left: r.x, top: r.y }}
            className="touch-tap-burst"
          />
        ))}
      </div>

      {/* Top Route Navigation Progress Bar */}
      {navigating && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 inset-x-0 z-[125] h-[3.5px] bg-slate-900/10 overflow-hidden"
        >
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#85B925] via-[#136EA8] to-[#38BDF8] shadow-[0_0_12px_rgba(19,110,168,0.8)] transition-[width] duration-200 ease-out"
          />
        </div>
      )}

      {/* Slow-Network / External Action Status Pill */}
      {statusLabel && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-3.5 left-1/2 -translate-x-1/2 z-[125] inline-flex items-center gap-2 rounded-full bg-[#0F1D35]/95 px-4 py-2 text-xs font-extrabold text-white shadow-xl border border-white/15 backdrop-blur-md animate-fade-in-fast"
        >
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#9AD634]" />
          <span>{statusLabel}</span>
        </div>
      )}
    </>
  );
}
