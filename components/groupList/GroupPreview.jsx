import React from 'react'
import Link from 'next/link'

const GroupPreview = React.memo( function GroupPreview({groupId, groupName, lastMessage, lastMessageDate}) {
  let lastDate = null;

  if (lastMessageDate) {
    try {
      lastDate = new Date(lastMessageDate);
      if (isNaN(lastDate.getTime())) throw new Error("Invalid Date");
    } catch (e) {
      console.error("Invalid date format:", lastMessageDate);
    }
  }
  
  
    // Optional formatting (e.g., show time if within 24 hours)
    const now = new Date();
    let displayDate = "";
    if (lastDate) {
      const diff = now - lastDate;
      const oneDay = 24 * 60 * 60 * 1000;
  
      displayDate =
        diff < oneDay
          ? lastDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : lastDate.toLocaleDateString();
    }

    return (
      <Link
        href={`/groups/${groupId}`}
        className="flex items-start border-b border-slate-200 py-2 sm:py-3 hover:bg-slate-50 hover:cursor-pointer"
      >
{/* Avatar/Icon */}
        <div className="flex-shrink-0 aspect-square w-16 sm:w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center relative">
            <i className="fa-solid fa-user text-slate-500 text-2xl sm:text-4xl">
            </i>
        </div>

{/* Text content */}
        <div className="ml-3 flex-1 min-w-0">
            <div className="grid grid-cols-2">
              <div className="font-bold sm:text-xl truncate">
                {groupName}
              </div>
              <div className="font-medium italic text-slate-700 text-right sm:text-lg">
                {displayDate}
              </div>
            </div>
            <div className="sm:text-lg line-clamp-2">           
              {lastMessage}
            </div>
        </div>
      </Link>
    )
});

export default GroupPreview;
