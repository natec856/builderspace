'use client'

import React, { useState, useEffect } from "react"
import ProfileInfo from "./ProfileInfo"
import CategorySection from "./CategorySection"
import BioSection from "./BioSection"
import ProfileButtons from "./ProfileButtons"
import ProfileVisitorBtns from "./ProfileVisitorBtns"
import { createClient } from "@/utils/supabase/client"
import { useSearchParams } from "next/navigation"

export default function ProfileContainer({ user }) {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const editParam = searchParams.get('edit')

  const defaultUser = {
    id: '',
    username: '',
    name: '',
    bio: "Click the edit profile button to set a name, bio, and categories you're interested in.",
    categories: [],
    avatar_url: '',
    connections: [],
    invites: [],
  }

  const [isEditing, setIsEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [profileData, setProfileData] = useState(user || defaultUser)

  const isOwner = currentUser?.id === profileData.id

  useEffect(() => {
    if (editParam === 'true') {
      setIsEditing(true)
    }
  }, [editParam])

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      setCurrentUser(authUser)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (!isEditing) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isEditing])

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !profileData.id) return

    const fileExt = file.name.split('.').pop()
    const filePath = `${profileData.id}/avatar.${fileExt}`

    // Upload to Supabase 'avatars' bucket
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      console.error('Upload error:', uploadError.message)
      return
    }

    // Get public URL
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    if (data?.publicUrl) {
      handleChange("avatar_url", data.publicUrl)
    }
  }

  const handleShare = () => {
    const shareData = {
      title: 'Check out this profile',
      text: `See what ${profileData.name} is up to on BuilderSpace`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        console.error("Sharing failed:", err)
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Profile link copied to clipboard!")
    }
  }

  const handleSaveToSupabase = async () => {
    if (!profileData.id) return console.error("No user ID to update")

    const { error } = await supabase
      .from('users')
      .update({
        name: profileData.name,
        bio: profileData.bio,
        categories: profileData.categories,
        avatar_url: profileData.avatar_url,
      })
      .eq('id', profileData.id)

    if (error) {
      console.error('Error saving user profile:', error.message)
    } else {
      console.log('Profile updated successfully')
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-screen-md flex flex-col items-center bg-white shadow-md shadow-slate-400 rounded-md h-fit px-4 py-6 mx-2 mt-5 md:mt-10 mb-36">
        <div className="h-fit">
          <ProfileInfo
            username={profileData.username}
            name={profileData.name}
            avatar_url={profileData.avatar_url}
            isEditing={isEditing}
            onChange={handleChange}
            onImageUpload={handleImageUpload}
          />
          <ProfileVisitorBtns
            onChange={(newInvites) =>
              setProfileData((prev) => ({ ...prev, invites: newInvites }))
            }
            isOwner={isOwner}
          />
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
            onDone={async () => {
              await handleSaveToSupabase()
              setIsEditing(false)
            }}
            onShare={handleShare}
            isOwner={isOwner}
          />
        </div>
      </div>
    </div>
  )
}