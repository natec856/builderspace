"use client"
import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import CategorySection from "./CategorySection";
import BioSection from "./BioSection";
import ProfileButtons from "./ProfileButtons";
import ProfileVisitorBtns from "./ProfileVisitorBtns";

export default function Profile({ user }) {

  const currentUser = { username: "NateC32" }; // Hardcoded current user for testing

  const defaultUser = {
    username: "",
    name: "",
    bio: "",
    profilePic: "",
    categories: [],
    connections: [],
    invites: [],
  };

  const [profileData, setProfileData] = useState(user || defaultUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange("profilePic", imageUrl);
    }
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this profile',
      text: `See what ${profileData.name} is up to on BuilderSpace`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        console.error("Sharing failed:", err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  const isOwner = currentUser?.username === user.username;

  // Auto-scroll when editing finishes
  useEffect(() => {
    if (!isEditing) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isEditing]);

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1">
      <div className="h-fit">
        <ProfileInfo
          username={profileData.username}
          name={profileData.name}
          profilePic={profileData.profilePic}
          isEditing={isEditing}
          onChange={handleChange}
          onImageUpload={handleImageUpload}
        />

        <ProfileVisitorBtns
          onChange={(newInvites)=>
            setProfileData((prev) => ({...prev, invites: newInvites }))
          }
          isOwner={isOwner} />

        <CategorySection
          categories={profileData.categories}
          isEditing={isEditing}
          onChange={(newCategories) =>
            setProfileData((prev) => ({ ...prev, categories: newCategories }))
          }
        />

        <BioSection
          bio={profileData.bio}
          isEditing={isEditing}
          onChange={(newBio) => handleChange("bio", newBio)}
        />

        <ProfileButtons
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onDone={() => setIsEditing(false)}
          onShare={handleShare}
          isOwner={isOwner}
        />

      </div>
    </div>
  );
}
