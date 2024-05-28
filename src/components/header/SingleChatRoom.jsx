import Link from 'next/link';
import React, { useState } from 'react';
import useApiHook from '@/hooks/useApiHook';
import { useDispatch } from 'react-redux';
import { selectAuth, useSelector } from '@/lib';
import { RotatingLines } from 'react-loader-spinner';
import { saveUserChatArray } from '@/lib/slices/userChat/userChatSlice';
import {
  saveUnassignedChatArray,
  markChanged,
} from '@/lib/slices/unAssignedChats/unAssignedChatsSlice';

export default function SingleChatRoom({ chatroom, onClose, index }) {
  const [showTitle, setShowTitle] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [chatTitle, setChatTitle] = useState(chatroom.title);
  const { handleApiCall, isApiLoading } = useApiHook();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const showTitleEditor = () => {
    setShowTitle(!showTitle);
    setShowEditor(!showEditor);
  };

  const handleUpdateTitle = async () => {
    const values = { chatRoomId: chatroom._id, title: chatTitle };
    const result = await handleApiCall({
      method: 'PUT',
      url: '/chat-room/title',
      data: values,
      token: auth.userInfo?.accessToken,
    });
    if (result?.status === 200) {
      setShowTitle(!showTitle);
      setShowEditor(!showEditor);
      const response = await handleApiCall({
        method: 'GET',
        url: `/chat-room/search`,
        token: auth.userInfo?.accessToken,
      });
      if (response?.status === 200) {
        dispatch(saveUserChatArray(response?.data?.chatRooms.reverse()));
      }
      const unAssignedChatRooms = response?.data?.chatRooms.filter(
        (chatRoom) => chatRoom.project == null
      );
      dispatch(markChanged());
    }
  };

  return (
    <>
      {showEditor && (
        <li className='relative group z-0 my-2'>
          <input
            type='text'
            value={chatTitle}
            onChange={(e) => setChatTitle(e.target.value)}
            className='w-full font-normal p-2 px- rounded-md border border-gray-400 bg-transparent  pr-6'
          />

          {isApiLoading ? (
            <span className='absolute right-2 top-3'>
              <RotatingLines
                visible={true}
                height='14'
                width='14'
                color='blue'
                strokeWidth='5'
                animationDuration='0.75'
                ariaLabel='rotating-lines-loading'
                wrapperStyle={{}}
                wrapperClass=''
              />
            </span>
          ) : (
            <svg
              onClick={handleUpdateTitle}
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 absolute right-2 top-3 cursor-pointer'
              width={20}
              height={20}
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          )}
        </li>
      )}
      {showTitle && (
        <li className='relative group z-0'>
          <Link
            href={`/dashboard/c/${chatroom?._id}`}
            className='px-2 py-0.5 block capitalize text-xs cursor-pointer rounded-md text-white-200 hover:bg-gray-100'
          >
            {chatTitle.length > 35
              ? `${chatTitle?.slice(0, 35)}...`
              : chatTitle}
          </Link>
          <img
            onClick={showTitleEditor}
            src='/assets/images/sidebar/edit.svg'
            className='w-4 hidden group-hover:block absolute right-1 top-1.5 cursor-pointer'
          />
        </li>
      )}
    </>
  );
}
