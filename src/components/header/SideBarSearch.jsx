import React, { useState, useEffect } from 'react';
import SingleChatRoom from './SingleChatRoom';
import { RotatingLines } from 'react-loader-spinner';

function SidebarSearch({ chats, onClose, isApiLoading, updateChat }) {
  const [groupedChats, setGroupedChats] = useState({});
  useEffect(() => {
    setGroupedChats(groupChatsByDate(chats));
  }, [chats]);

  function groupChatsByDate(chats) {
    const groupedChats = {
      Today: [],
      Yesterday: [],
      'Previous 7 Days': [],
      'Previous 30 Days': [],
    };

    const today = new Date();
    const lastMonth = new Date(today);
    const currentYear = today.getFullYear();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastYear = new Date(today);
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const secondLastYear = new Date(lastYear);
    secondLastYear.setFullYear(secondLastYear.getFullYear() - 1);

    chats.forEach((chat) => {
      const dateCreated = new Date(chat.createdAt);

      if (isSameDate(dateCreated, today)) {
        groupedChats['Today'].push(chat);
      } else if (isSameDate(dateCreated, getYesterday(today))) {
        groupedChats['Yesterday'].push(chat);
      } else if (isWithinDays(dateCreated, today, 7)) {
        groupedChats['Previous 7 Days'].push(chat);
      } else if (isWithinDays(dateCreated, today, 30)) {
        groupedChats['Previous 30 Days'].push(chat);
      } else if (
        dateCreated.getFullYear() === currentYear &&
        !isSameDate(dateCreated, lastMonth)
      ) {
        const monthName = dateCreated.toLocaleString('default', {
          month: 'long',
        });
        groupedChats[monthName] = groupedChats[monthName] || [];
        groupedChats[monthName].push(chat);
      } else {
        const year = dateCreated.getFullYear().toString();
        groupedChats[year] = groupedChats[year] || [];
        groupedChats[year].push(chat);
      }
    });

    return groupedChats;
  }

  function isSameMonthYear(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }

  function isSameYear(date1, date2) {
    return date1.getFullYear() === date2.getFullYear();
  }

  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  function isWithinDays(date, baseDate, days) {
    const timeDiff = Math.abs(date.getTime() - baseDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays <= days;
  }

  // Helper function to get yesterday's date
  function getYesterday(date) {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }

  return (
    <div className='w-full'>
      {chats.length > 0 ? (
        <div className='w-full'>
          {Object.entries(groupedChats).map(([dateRange, chats]) => {
            if (!isNaN(dateRange)) {
              return null;
            }
            return (
              chats.length > 0 && (
                <div key={dateRange}>
                  <h3 className=' font-normal my-1 text-gray-400 text-sm pl-1'>
                    {dateRange}
                  </h3>
                  <ul className='w-full mb-3'>
                    {chats.map((chat, index) => (
                      <SingleChatRoom
                        chatroom={chat}
                        onClose={onClose}
                        index={index}
                        key={chat._id + index}
                      />
                    ))}
                  </ul>
                </div>
              )
            );
          })}
          {Object.keys(groupedChats)
            .filter((key) => !isNaN(key))
            .sort((a, b) => b - a)
            .map(
              (year) =>
                groupedChats[year].length > 0 && (
                  <div key={year}>
                    <h3 className='font-normal my-1 text-gray-400 text-sm pl-1'>
                      {year}
                    </h3>
                    <ul className='w-full mb-3'>
                      {groupedChats[year].map((chat, index) => (
                        <SingleChatRoom
                          chatroom={chat}
                          onClose={onClose}
                          index={index}
                          key={chat._id + index}
                        />
                      ))}
                    </ul>
                  </div>
                )
            )}
        </div>
      ) : isApiLoading ? null : (
        <p>No chats found</p>
      )}
      {isApiLoading && (
        <div
          className={`flex justify-center w-full mb-4 text-white ${
            updateChat ? 'h-full items-center' : ' relative bottom-3'
          }`}
        >
          <RotatingLines
            visible={true}
            height='14'
            width='14'
            color='white'
            strokeWidth='5'
            animationDuration='0.75'
            ariaLabel='rotating-lines-loading'
            wrapperStyle={{ backgroundColor: 'white' }}
            wrapperClass=''
          />
        </div>
      )}
    </div>
  );
}

export default SidebarSearch;
