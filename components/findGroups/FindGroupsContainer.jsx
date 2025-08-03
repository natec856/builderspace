'use client'
import { useState, useEffect } from 'react'
import FindTopics from './FindTopics'
import FindExperience from './FindExperience'
import FindStart from './FindStart'
import FindSubmit from './FindSubmit'
import FindComplete from './FindComplete'
import FindCooldown from './FindCooldown'

function isWithin24Hours(timestamp) {
  if (!timestamp) return false
  const last = new Date(timestamp)
  const now = new Date()
  const diffMs = now - last
  return diffMs < 24 * 60 * 60 * 1000
}

export default function FindGroupsContainer() {
  const [findStep, setFindStep] = useState('start')
  const [userData, setUserData] = useState({
    topics: [],
    experience: '',
    timestamp: null,
    hasMessagedInGroup: false,
  })

  const now = Date.now();
  const canSubmit =
    (!userData.timestamp || now - userData.timestamp > 86400000) && userData.hasMessagedInGroup;

  // Load userData from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('findGroupUserData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)

      if (isWithin24Hours(parsedData.timestamp)) {
        setFindStep('cooldown')
      }
    }
  }, [])

  // Save userData to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('findGroupUserData', JSON.stringify(userData))
  }, [userData])

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1">
      {findStep === 'cooldown' && (
        <FindCooldown 
          findstep={findStep}/>
      )}
      {findStep === 'start' && (
        <FindStart 
          findStep={findStep} 
          onDone={() => setFindStep('topics')} />
      )}
      {findStep === 'topics' && (
        <FindTopics 
          findStep={findStep}
          onDone={(topics) => {
            setUserData(prev => ({ ...prev, topics }));
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
          onBack={() => setFindStep('topics')}
          userData={userData} />
      )}
      {findStep === 'submit' && (
        <FindSubmit 
          findStep={findStep} 
          onDone={(timestamp) => {
            setUserData(prev => ({ ...prev, timestamp }));
            setFindStep('complete');
          }}
          onBack={() => setFindStep('experience')}
          userData={userData} />
      )}
      {findStep === 'complete' && (
        <FindComplete 
          findStep={findStep} 
          onDone={() => {
            if (!canSubmit) {
              setFindStep('cooldown');
            } else {
              setFindStep('start'); // or wherever the workflow begins
            }
          }} />
      )}
    </div>
  )
}