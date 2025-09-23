'use client';

import React from "react";

const CATEGORIES = [
  "AI & Machine Learning",
  "Content Creation",
  "Crypto / Web3",
  "Design",
  "E-commerce",
  "Education",
  "Fashion",
  "Finance",
  "Fitness",
  "Freelancing",
  "Gaming",
  "Health & Wellness",
  "Marketing",
  "Mobile Apps",
  "Music",
  "Nonprofit",
  "Photography",
  "Productivity",
  "Real Estate",
  "SaaS",
  "Social Media",
  "Startups",
  "Videography",
  "Web Development",
  "Writing"
];

export default function CategorySection({ categories = [], isEditing, onChange }) {
  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  const handleRemove = (cat) => {
    onChange(safeCategories.filter((c) => c !== cat));
  };

  const handleAdd = (cat) => {
    if (safeCategories.length < 5) {
      onChange([...safeCategories, cat]);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2 mb-2">
        {safeCategories.map((cat, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-600 text-white text-sm sm:text-lg xl:text-xl px-3 py-1 rounded-full"
          >
            {cat}
            {isEditing && (
              <button
                onClick={() => handleRemove(cat)}
                className="ml-2 text-white hover:text-red-300"
              >
                &times;
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditing && (
        <>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border border-slate-300 rounded p-2">
            {CATEGORIES.filter((cat) => !safeCategories.includes(cat)).map((cat, index) => {
              const isMaxed = safeCategories.length >= 5;
              return (
                <button
                  key={index}
                  onClick={() => handleAdd(cat)}
                  disabled={isMaxed}
                  className={`${
                    isMaxed
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-slate-200 text-slate-800 hover:bg-blue-100"
                  } text-sm sm:text-xl px-3 py-1 rounded-full`}
                >
                  + {cat}
                </button>
              );
            })}
          </div>
          <p className="text-xs sm:text-xl text-slate-500 mt-1">
            Select up to 5 categories that reflect what you do or create.
          </p>
        </>
      )}
    </div>
  );
}
