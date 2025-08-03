import React from 'react'

export default function Main(props) {
    const { children } = props
    return (
        <main className='bg-slate-50 flex-1 flex flex-col'>
            {children}
        </main>
    )
}
