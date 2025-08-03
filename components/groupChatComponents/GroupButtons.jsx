import React from 'react'

export default function GroupButtons({isEditing, onEdit, onDone}) {
  return (
    <>
        <div className="text-xs sm:text-lg">
        {isEditing ? (
            <button
            className="bg-slate-200 rounded-md px-2 py-1 font-semibold ml-2"
            onClick={onDone}
            >
            Done
            </button>
        ) : (
            <button
                className="font-semibold"
                onClick={onEdit}
            >
                <i className='fa-solid fa-pencil text-xs text-slate-900'></i>
            </button>
        )}
        </div>
    </>
  )
}
