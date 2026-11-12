import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#136EA8]">
        <Compass className="h-7 w-7" />
      </div>
      <h1 className="mt-5 font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm sm:text-base text-slate-600">
        The condition or page you requested may have moved. Explore our MPT
        Specialty departments or book a consultation directly below.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-5 py-3 text-sm font-bold text-white hover:bg-[#136EA8] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Runlife Home
        </Link>
        <Link
          href="/conditions"
          className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-slate-900 transition"
        >
          Browse All Conditions
        </Link>
      </div>
    </div>
  );
}
