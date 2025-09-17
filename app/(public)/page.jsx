import Main from '@/components/MainPublic';
import Hero from '@/components/landingPageComponents/Hero';
import React from 'react'

export const metadata = {
    title: "Skocoh",
  };

export default function HomePage() {
  return (
    <div className='bg-blue-100'>
      <Hero />
    </div>
  )
}
