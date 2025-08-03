"use client"
import React, { useRef, useEffect } from "react";

export default function ProfileInfo({ username, name, profilePic, isEditing, onChange, onImageUpload }) {
  const textareaRef = useRef(null)

  // Auto-expand when isEditing becomes true
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="flex items-center gap-6">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center relative">
        {profilePic ? (
            <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
            />
            ) : (
            <i className="fa-solid fa-user text-slate-500 text-2xl sm:text-6xl" />
            )}
            {isEditing && (
            <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            )}
        </div>
        {isEditing && (
            <span className="text-xs sm:text-base text-blue-600 cursor-pointer">Edit picture</span>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 w-full">
        <h2 className="text-xl sm:text-2xl font-semibold">@{username}</h2>
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={name}
            maxLength={30}
            onChange={(e) => {
              onChange("name", e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="mt-1 block w-full border-2 border-slate-300 rounded px-2 py-1 text-sm sm:text-xl overflow-hidden resize-none leading-tight"
            rows={1}
          />
        ) : (
          <p className="text-slate-700 text-sm sm:text-xl line-clamp-2">{name}</p>
        )}
      </div>
    </div>
  );
}