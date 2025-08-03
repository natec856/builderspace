import Main from '@/components/Main'
import React from 'react'
import { login, signup } from './actions'

export default function Loginpage() {
  return (
    <Main>
        <form className='flex flex-col gap-4'>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required className='border' />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required className='border' />
            <button formAction={login} className='bg-blue-600'>Log in</button>
            <button formAction={signup} className='bg-blue-600'>Sign up</button>
        </form>
    </Main>
  )
}
