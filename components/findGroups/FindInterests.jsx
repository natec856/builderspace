'use client'
import React, { useState } from 'react';

export default function FindInterests({ onDone, userData }) {
  const INTERESTS = [
    "Building a Team",
    "Funding",
    "Idea Validation",
    "Marketing",
    "Monetization",
    "Navigating Failure",
    "Personal Brand",
    "Planning",
    "Sales",
    "Scaling",
    "Tools",
    "Time Allocation",
  ];

  const [selectedInterests, setSelectedInterests] = useState(userData.interests || []);

  const handleAdd = (interest) => {
    if (selectedInterests.length < 3 && !selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter((t) => t !== interest));
  };

  return (
    <div className='flex flex-col items-center w-full p-4'>
      <h1 className='font-bold text-xl text-center mb-4'>Choose up to 3 topics</h1>

      <div className='flex flex-wrap gap-2 justify-center mb-6'>
        {selectedInterests.map((interest) => (
          <span
            key={interest}
            onClick={() => handleRemove(interest)}
            className='bg-blue-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm'
          >
            {interest} &times;
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border border-slate-300 rounded p-2 mb-6">
        {INTERESTS.map((interest) => (
          <button
            key={interest}
            onClick={() => handleAdd(interest)}
            disabled={selectedInterests.includes(interest) || selectedInterests.length >= 3}
            className={`rounded-full px-3 py-2 text-xs font-medium 
              ${selectedInterests.includes(interest) ? 'hidden' : 'bg-slate-200 text-slate-800 hover:bg-blue-100'}
            `}
          >
            + {interest}
          </button>
        ))}
      </div>

      <button
        onClick={() => onDone(selectedInterests)}
        disabled={selectedInterests.length === 0}
        className='bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-base w-full max-w-[250px] disabled:opacity-50'
      >
        Continue
      </button>
    </div>
  );
}
