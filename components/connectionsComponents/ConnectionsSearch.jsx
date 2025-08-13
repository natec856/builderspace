import React, { useState, useEffect } from 'react';

export default function GroupSearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(inputValue);
    }, 300); // delay in ms

    return () => clearTimeout(timeout);
  }, [inputValue, onSearch]);

  return (
    <div className="w-full py-3 border-b border-slate-200 bg-white">
      <div className="flex items-center bg-slate-100 px-3 py-2 lg:px-5 lg:py-4 rounded-full w-full  max-w-[250px] shadow-sm">
        <i className="fa-solid fa-search text-slate-500 mr-2 text-sm md:text-lg lg:text-xl xl:text-2xl"></i>
        <input
          type="text"
          placeholder="Search connections"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent focus:outline-none text-slate-900 w-full placeholder:text-slate-400 text-sm md:text-lg lg:text-xl xl:text-2xl"
        />
      </div>
    </div>
  );
}
