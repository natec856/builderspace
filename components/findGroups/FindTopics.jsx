'use client'
import React, { useState } from 'react';

export default function FindTopics({ onDone, userData }) {
  const TOPICS = [
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

  const [selectedTopics, setSelectedTopics] = useState(userData.topics || []);

  const handleAdd = (topic) => {
    if (selectedTopics.length < 3 && !selectedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleRemove = (topic) => {
    setSelectedTopics(selectedTopics.filter((t) => t !== topic));
  };

  return (
    <div className='flex flex-col items-center w-full p-4'>
      <h1 className='font-bold text-xl text-center mb-4'>Choose up to 3 topics</h1>

      <div className='flex flex-wrap gap-2 justify-center mb-6'>
        {selectedTopics.map((topic) => (
          <span
            key={topic}
            onClick={() => handleRemove(topic)}
            className='bg-blue-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm'
          >
            {topic} &times;
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border border-slate-300 rounded p-2 mb-6">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => handleAdd(topic)}
            disabled={selectedTopics.includes(topic) || selectedTopics.length >= 3}
            className={`rounded-full px-3 py-2 text-xs font-medium 
              ${selectedTopics.includes(topic) ? 'hidden' : 'bg-slate-200 text-slate-800 hover:bg-blue-100'}
            `}
          >
            + {topic}
          </button>
        ))}
      </div>

      <button
        onClick={() => onDone(selectedTopics)}
        disabled={selectedTopics.length === 0}
        className='bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-base w-full max-w-[250px] disabled:opacity-50'
      >
        Continue
      </button>
    </div>
  );
}
