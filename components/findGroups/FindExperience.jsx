'use client'
import React, { useState } from 'react'

export default function FindExperience({ onDone, onBack, userData }) {
  const EXPERIENCE = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
  };

  const experienceKey = Object.keys(EXPERIENCE).find(
    (key) => EXPERIENCE[key] === userData.experience
  );

  const [selected, setSelected] = useState(experienceKey || null);

  const handleSelect = (level) => {
    setSelected(level);
  };

  const handleContinue = () => {
    if (selected) {
      onDone(EXPERIENCE[selected]);
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='font-bold text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6'>
        What's your experience level with the topics you've chosen?
      </h1>
      
      <ul className='w-full max-w-md space-y-2'>
        {Object.entries(EXPERIENCE).map(([level, label]) => (
          <li key={level}>
            <button
              onClick={() => handleSelect(level)}
              className={`w-full text-center py-2 px-4 rounded border font-medium cursor-pointer text-base sm:text-lg md:text-xl lg:text-2xl 
                ${selected === level
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-slate-300 hover:bg-blue-50'}`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className='text-base sm:text-lg md:text-xl lg:text-2xl bg-blue-600 text-white py-2 px-4 rounded-full font-semibold w-full max-w-[300px] disabled:opacity-50 cursor-pointer mt-6'
      >
        Continue
      </button>
      <button
        onClick={onBack}
        className='bg-slate-200 text-slate-800 py-2 px-4 rounded-full font-medium text-base sm:text-lg md:text-xl lg:text-2xl w-full max-w-[300px] mt-6 cursor-pointer'
      >
        Previous
      </button>
    </div>
  )
}
