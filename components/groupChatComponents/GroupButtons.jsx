import React from 'react'

export default function GroupButtons({isEditing, onEdit, onDone}) {
  return (
    <>
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        {isEditing ? (
            <button
            className="flex flex-col items-center justify-center bg-blue-600 text-white rounded-md w-6 h-6 sm:w-10 sm:h-10 px-2 md:px-4 shadow-sm"
            onClick={onDone}
            >
            <i className='fa-solid fa-check'></i>
            </button>
        ) : (
            <button
                className="flex flex-col items-center justify-center w-10 h-10 px-2 md:px-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-shadow-sm"
                onClick={onEdit}
            >
                <i className='fa-solid fa-pencil text-slate-900'></i>
            </button>
        )}
        </div>
    </>
  )
}
