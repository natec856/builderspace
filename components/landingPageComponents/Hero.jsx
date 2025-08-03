import React from 'react'
import CallToAction from './CallToAction'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });


export default function Hero() {
  return (
    <div className='h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1 gap-4'>
      <h1 className={'text-2xl sm:text-6xl md:text-7xl text-center mb-4 ' + inter.className}>
        Instantly connect with serious creators and entrepreneurs.
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[1020px] mb-4'>
        <span className='text-blue-600 font-medium'>BuilderSpace</span> automatically matches you into small, curated groups based on your goals. It's networking made <span className='italic text-blue-600'>fast, easy, and effective.</span>
      </p>
      <CallToAction />
      <section className="mt-8 sm:mt-16 mb-8 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-semibold text-center text-slate-800 mb-6">
          How It Works
        </h2>

        <div className="grid sm:grid-cols-3 gap-8">
          {/* <!-- Step 1 --> */}
          <div className="flex flex-col items-center text-center">
            <div className="text-white bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-medium mb-2">Create Your Profile</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Tell us who you are, what you’re building, and who you want to meet. It takes less than a minute.
            </p>
          </div>

          {/* <!-- Step 2 --> */}
          <div className="flex flex-col items-center text-center">
            <div className="text-white bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-medium mb-2">Get Matched to a Group</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              We automatically match you with a small, curated group of creators and/or entrepreneurs based on shared goals.
            </p>
          </div>

          {/* <!-- Step 3 --> */}
          <div className="flex flex-col items-center text-center">
            <div className="text-white bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-medium mb-2">Start Building Together</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Connect in your private group chat, collaborate, and grow together — all inside BuilderSpace.
            </p>
          </div>

          {/* <!-- Step 4 --> */}
          <div className="flex flex-col items-center text-center">
            <div className="text-white bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4">
              4
            </div>
            <h3 className="text-xl font-medium mb-2">Keep Building</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              You're able to join a new group everyday as long as you participate in your current group!
            </p>
          </div>
        </div>
      </section>
      <CallToAction />
    </div>
  )
}
