'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react'

export default function ProfileVisitorBtns({ isOwner }) {
  if (isOwner) return null;

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(false); // only runs on mount
  }, []);

  return (
    <div className='flex items-center gap-6 mt-3'>
      {!isConnected ? (
        <button
          onClick={() => setIsConnected(true)}
          className='bg-blue-600 text-white rounded-full px-3 py-1 font-semibold'>
          + Connect
        </button>
      ) : (
        <Link
          href={`/directMessages`}
          className='bg-slate-200 text-slate-900 rounded-full px-3 py-1 font-semibold'>
          Message
        </Link>
      )}
    </div>
  );
}
