'use client';
import {
  selectAuth,
  toggleLogin,
  useDispatch,
  updateUser,
  updateBalance,
} from '@/lib';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import NotificationsPopup from './NotificationsPopup';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(false);
  const notificationRef = useRef(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    document.body.style.overflowY = showSidebar ? 'visible' : 'hidden';
  };

  const handleLogout = async () => {
    dispatch(toggleLogin({ isLogin: false }));
    router.push('/sign-in');
  };




  useEffect(() => {
  }, []);

  return (
    <>
      <section className=' pt-4 pb-2 md:px-2.5 flex justify-between max-w-screen-3xl m-auto min-w-80 z-10'>
        <div className=' w-auto pl-3 md:pl-0 md:w-64'>
          <Link href='/' className='pl-4 md:pl-10 inline-block'>
            <img
              src='/assets/images/navbar/logo.png'
              className=' w-14 md:w-[5rem]'
            />
          </Link>
        </div>

        <div className='flex justify-center items-center gap-2 pr-2 md:pr-10'>
          {auth?.isLogin ? (
            <div className='flex pr-1'>
              <span className='w-10 hidden'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#fff'
                  className='w-6 h-6 cursor-pointer'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </span>
              <Link
                href='/'
                title='New chat'
                className='cursor-pointer bg-Gradient w-10 md:w-14 flexCenter rounded-xl py-1 text-black'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
              </Link>
              <span
                ref={notificationRef}
                title='Notifications'
                className='cursor-pointer relative w-8 inline-block flexCenter rounded-xl py-1 ml-2 text-white notifications'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                  />
                </svg>
                {showNotificationDot && (
                  <span className='inline-block bg-red-700 top-1 right-0 w-3 h-3 rounded-full absolute'></span>
                )}

                {showNotification && (
                  <NotificationsPopup
                    isApiLoading={isApiLoading}
                    markAllNotificationAsRead={markAllNotificationAsRead}
                    notificationData={notificationsData}
                    onClose={() => setShowNotification(false)}
                  />
                )}
              </span>
              {auth?.isLogin && (
                <button
                  className='text-white mx-1'
                  onClick={handleLogout}
                  title='Logout'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9'
                    />
                  </svg>
                </button>
              )}
              <span
                className='cursor-pointer w-8 md:w-10 inline-block flexCenter rounded-xl py-0 pl-1 text-white'
                onClick={toggleSidebar}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            </div>
          ) : (
            <div className='flex'>
              <Link
                title='Sign In'
                href='/sign-in'
                className='cursor-pointer w-10 md:w-14 flexCenter rounded-xl py-1 text-black'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z'
                    fill='#ffffff'
                    clipRule='evenodd'
                  />
                  <path
                    fillRule='evenodd'
                    d='M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z'
                    fill='#ffffff'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {showSidebar && <SideBar onClose={toggleSidebar} />}
    </>
  );
}
