'use client'

import React from 'react'
import CallToAction from './CallToAction'
import { Inter } from 'next/font/google'
import { Check } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function Hero() {
  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-10 sm:py-16 sm:px-10 lg:px-20 bg-white">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 max-w-6xl ${inter.className}`}
        >
          Instantly connect with serious{' '}
          <span className="italic text-blue-600">creators</span> and{' '}
          <span className="italic text-blue-600">entrepreneurs</span>.
        </h1>

        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-snug text-slate-800 max-w-4xl mb-10 font-medium">
          <span className="text-blue-600 font-semibold">BuilderSpace</span> matches you into small, curated groups based on your goals. It's networking made{' '}
          <span className="italic text-blue-600">fast, easy, and effective.</span>
        </p>

        <CallToAction />
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900 w-full py-20 px-6 sm:px-10 lg:px-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: 'Create Your Profile',
              desc: 'Tell us who you are, what you’re building, and who you want to meet. It takes less than a minute.',
            },
            {
              title: 'Get Matched to a Group',
              desc: 'We match you with a small, curated group of like-minded builders based on shared goals.',
            },
            {
              title: 'Start Building Together',
              desc: 'Connect in your private group chat, collaborate, and grow all inside BuilderSpace.',
            },
            {
              title: 'Keep Building',
              desc: 'Join a new group every day as long as you stay active in your current group!',
            },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-10 text-center transition transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="text-white bg-blue-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mb-4 mx-auto">
                {i + 1}
              </div>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-semibold mb-2 text-slate-900">{title}</h3>
              <p className="text-slate-700 text-lg sm:text-2xl md:text-3xl">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-20 bg-white">
        <CallToAction />
      </div>

      {/* Benefits */}
      <section className="bg-slate-900 w-full py-20 px-6 sm:px-10 lg:px-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-16">
          Curated Connections, Real Results
        </h2>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {[
            {
              title: 'No cold outreach',
              desc: 'Instantly placed in a group with aligned goals and mindsets = no pitching or awkward intros.',
            },
            {
              title: 'Time-saving',
              desc: 'Skip endless searching. Get connected with people you should already know.',
            },
            {
              title: 'No gatekeeping',
              desc: 'Forget corporate jargon. These groups are about real support, not playing the game.',
            },
            {
              title: 'Faster growth',
              desc: 'Surround yourself with people building like you. Progress happens faster together.',
            },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white shadow-md rounded-xl p-8 min-h-[140px] transition transform hover:scale-[1.01] hover:shadow-lg"
            >
              <div className="flex items-center">
                <Check className="w-10 h-10 md:w-14 md:h-14 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-slate-700 text-lg sm:text-2xl md:text-3xl">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* REPEATED CTA */}
      <div className="py-20 bg-white">
        <CallToAction />
      </div>
    </div>
  )
}