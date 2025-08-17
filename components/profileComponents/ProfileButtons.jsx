"use client";
import React from "react";

export default function ProfileButtons({ isEditing, onEdit, onDone, onShare, isOwner }) {
  if (!isOwner) return null;

  return (
    <div className="flex gap-4 justify-center text-xs sm:text-lg lg:text-xl">
      {isEditing ? (
        <button
          className="bg-slate-200 rounded-md px-4 py-2 font-semibold hover:cursor-pointer transition-transform duration-200 hover:scale-[1.05]"
          onClick={onDone}
        >
          Save
        </button>
      ) : (
        <>
          <button
            className="bg-slate-200 rounded-md px-4 py-2 font-semibold hover:cursor-pointer transition-transform duration-200 hover:scale-[1.05]"
            onClick={onEdit}
          >
            Edit Profile
          </button>
          <button
            className="bg-slate-200 rounded-md px-4 py-2 font-semibold hover:cursor-pointer transition-transform duration-200 hover:scale-[1.05]"
            onClick={onShare}
          >
            Share Profile
          </button>
        </>
      )}
    </div>
  );
}
