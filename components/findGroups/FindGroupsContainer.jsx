'use client'
import { useState, useEffect } from 'react'
import FindTopics from './FindInterests'
import FindExperience from './FindExperience'
import FindStart from './FindStart'
import FindSubmit from './FindSubmit'
import FindComplete from './FindComplete'
import FindCooldown from './FindCooldown'
import { createClient } from '@/utils/supabase/client'

function isWithin24Hours(timestamp) {
  if (!timestamp) return false
  const last = new Date(timestamp)
  const now = new Date()
  const diffMs = now - last
  return diffMs < 24 * 60 * 60 * 1000
}

export default function FindGroupsContainer({user}) {
  const [findStep, setFindStep] = useState('start')
  const [userData, setUserData] = useState({
    interests: [],
    experience: '',
  })
  const supabase = createClient()

// On page load check if the user is in the staging pool or not
  useEffect(() => {
  const checkStagingPool = async () => {
    const { data, error } = await supabase
      .from("staging_pool")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
// Log the error
      if (error) {
        console.error("Error checking user staging status:", error);
        return;
      }
// If the user is in the staging pool, set the step to cooldown
      if (data) {
        setFindStep("cooldown"); 
      } else {
        setFindStep("start")
      }
    };
// If the user changes, rerun
    if (user?.id) {
      checkStagingPool();
    }
  }, [user?.id, supabase]);

  // Save userData to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('findGroupUserData', JSON.stringify(userData))
  }, [userData])

  return (
    <div className='flex w-full justify-center'> 
      <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-screen-md mx-2 mt-4 px-4 py-6 mb-35 flex-1">
        {findStep === 'cooldown' && (
          <FindCooldown 
            findstep={findStep}/>
        )}
        {findStep === 'start' && (
          <FindStart 
            findStep={findStep} 
            onDone={() => setFindStep('interests')} />
        )}
        {findStep === 'interests' && (
          <FindTopics 
            findStep={findStep}
            onDone={(interests) => {
              setUserData(prev => ({ ...prev, interests }));
              setFindStep('experience');
            }}
            userData={userData} />
        )}
        {findStep === 'experience' && (
          <FindExperience 
            findStep={findStep} 
            onDone={(experience) => {
              setUserData(prev => ({ ...prev, experience }));
              setFindStep('submit');
            }} 
            onBack={() => setFindStep('interests')}
            userData={userData} />
        )}
        {findStep === 'submit' && (
          <FindSubmit 
            findStep={findStep} 
            onDone={() => setFindStep('complete')}
            onBack={() => setFindStep('experience')}
            userData={userData}
            user_id={user.id} />
        )}
        {findStep === 'complete' && (
          <FindComplete 
            findStep={findStep} 
            username={user.username} />
        )}
      </div>
    </div>
  )
}