"use client"
import React from "react";

export default function BioSection({ bio, isEditing, onChange }) {
  return (
    <div className="mt-4">
      {isEditing ? (
        <>
          <textarea 
            value={bio}
            onChange={(e) => onChange(e.target.value)}
            maxLength={150}
            rows={5}
            className="w-full h-34 border border-slate-300 rounded px-2 py-1 text-sm sm:text-xl resize-none"
            placeholder="Enter your bio (max 150 characters)..."
          />
          <p className="text-xs sm:text-xl text-slate-500">150 characters max</p>
        </>
      ) : (
        <p className="text-slate-700 text-sm sm:text-xl whitespace-pre-wrap">{bio}</p>
      )}
    </div>
  );
}
