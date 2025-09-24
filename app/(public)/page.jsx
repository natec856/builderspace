import BetaHero from '@/components/betaComponents/BetaHero';
import React from 'react'

export const metadata = {
    title: "Skocoh",
  };

export default function HomePage() {
  return (
    <div className='bg-blue-100'>
      <BetaHero />
    </div>
  )
}
