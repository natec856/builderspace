'use client'
import React, { useState } from 'react'

export default function FindExperience({ onDone, onBack, userData }) {
  const EXPERIENCE = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert'
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
      <h1 className='font-bold text-xl text-center mb-4'>
        What's your experience level with the topics you've chosen?
      </h1>
      
      <ul className='w-full max-w-md space-y-2'>
        {Object.entries(EXPERIENCE).map(([level, label]) => (
          <li key={level}>
            <button
              onClick={() => handleSelect(level)}
              className={`w-full text-center px-4 py-2 rounded border font-medium 
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
        className='bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-base w-full max-w-[250px] mt-6 disabled:bg-blue-300'
      >
        Continue
      </button>
      <button
        onClick={onBack}
        className='bg-slate-200 text-slate-800 py-2 px-4 rounded-full font-medium text-base w-full max-w-[250px] mt-6'
      >
        Previous
      </button>
    </div>
  )
}
