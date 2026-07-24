import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard";
import heroImage from "../../assets/hero.png";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#5f1630] via-[#8c2748] to-[#a53c58] p-8 text-white shadow-2xl sm:p-10 lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_30%)]" />
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-rose-100">
              Discover your next favorite read
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Welcome to BookStore
            </h1>
            <p className="mt-4 text-lg text-rose-100 sm:text-xl">
              Buy and sell your favorite books at the best prices while exploring a cozy collection of stories.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                Fresh arrivals
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                Best sellers
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                Easy trading
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex h-64 w-full max-w-[320px] items-center justify-center lg:mx-0 p-0">
            <img
              src={heroImage}
              alt="Girl reading a book"
              className="h-full w-full max-w-[320px] object-contain animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
}