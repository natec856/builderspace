import React from 'react'

export default function GroupButtons({isEditing, onEdit, onDone}) {
  return (
    <>
        <div className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        {isEditing ? (
            <button
            className="bg-blue-600 text-white rounded-md h-full px-2 md:px-4 font-semibold ml-2"
            onClick={onDone}
            >
            Done
            </button>
        ) : (
            <button
                className="font-semibold"
                onClick={onEdit}
            >
                <i className='fa-solid fa-pencil text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-900'></i>
            </button>
        )}
        </div>
    </>
  )
}
