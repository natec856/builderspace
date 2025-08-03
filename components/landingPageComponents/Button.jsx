import { Inter } from 'next/font/google';
import React from 'react'

const inter = Inter({ subsets: ["latin"] });

export default function Button(props) {
  const { text, dark, full, header, clickHandler } = props
    return (
        <button onClick={clickHandler} className={'overflow-hidden duration-200 border-2 border-solid sm:text-md md:text-2xl lg:text-3xl w-full ' + (dark ? ' text-white bg-blue-600 border-blue-600 ' : ' text-blue-600 bg-white border-white ') + (full ? 'grid place-items-center w-full ' : ' ') + (header ? 'rounded-lg hover:cursor-pointer ' : 'rounded-full blueTranslate ')}>
            <p className={'px-3 py-2 sm:py-3 font-semibold ' + inter.className}>{text}</p>
        </button>
    )
}
