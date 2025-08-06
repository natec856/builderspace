"use client";
import React from "react";

export default function ProfileButtons({ isEditing, onEdit, onDone, onShare, isOwner }) {
  if (!isOwner) return null;

  return (
    <div className="flex gap-4 mt-4 pt-5 justify-center border-t-2 border-slate-200 text-xs sm:text-lg">
      {isEditing ? (
        <button
          className="bg-slate-200 rounded-md px-4 py-2 font-semibold"
          onClick={onDone}
        >
          Save
        </button>
      ) : (
        <>
          <button
            className="bg-slate-200 rounded-md px-4 py-2 font-semibold"
            onClick={onEdit}
          >
            Edit Profile
          </button>
          <button
            className="bg-slate-200 rounded-md px-4 py-2 font-semibold"
            onClick={onShare}
          >
            Share Profile
          </button>
        </>
      )}
    </div>
  );
}
