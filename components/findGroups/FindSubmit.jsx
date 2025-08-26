'use client'

import React from 'react'
import { createClient } from '@/utils/supabase/client'

export default function FindSubmit({ onDone, onBack, userData, user_id }) {

  const supabase = createClient()

    const handleSubmit = async () => {
      // Add user and the user's experience level and interests to the staging_pool table
      const { error: stagingError } = await supabase
        .from('staging_pool')
        .insert({
          user_id: user_id,
          experience_level: userData.experience,
          interests: userData.interests,
        })

      if (stagingError) {
        console.error('Error staging user:', stagingError)
        return
      }
      // Call the onDone to go to next step
      onDone()
    }
    
  return (
    <div className='flex flex-col items-center w-full px-4'>
      <h1 className='text-slate-900 font-bold text-2xl text-center mb-6'>Review Your Answers</h1>

        <div>
          <h2 className='text-sm text-slate-500 font-medium mb-2'>Topics:</h2>
          <div className='flex flex-wrap gap-2'>
            
              {userData.interests.map((interest, i) => (
                <span
                  key={i}
                  className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'
                >
                  {interest}
                </span>
              ))}
          </div>

        <div className='mt-6'>
          <h2 className='text-sm text-slate-500 font-medium mb-1'>Experience Level:</h2>
          <p className='text-base font-bold text-slate-900'>
            {userData.experience || 'Not specified'}
          </p>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className='bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-base w-full max-w-[250px] mt-8'
      >
        Submit
      </button>

      <button
        onClick={onBack}
        className='bg-slate-200 text-slate-800 py-2 px-4 rounded-full font-medium text-base w-full max-w-[250px] mt-4'
      >
        Previous
      </button>
    </div>
  )
}