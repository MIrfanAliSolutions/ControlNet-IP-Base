'use client';
import React, { useEffect, useState } from 'react';
import IntegrationPopup from './IntegrationPopup';
import { selectAuth, useSelector, selectUserChat } from '@/lib';
import GetInitials from '../common/GetInitials';


export default function SideBar({ onClose }) {
  const [showIntegration, setShowIntegration] = useState(false);
  const [showIntegrationPopup, setShowIntegrationPopup] = useState(false);
  const auth = useSelector(selectAuth);

  const toggleIntegration = () => {
    setShowIntegration(!showIntegration);
  };
  const addIntegration = () => {
    setShowIntegrationPopup(!showIntegrationPopup);
  };

  const linkToDashboard = () => {
    onClose();
  };

  return (
    <div className='relative z-20'>
      <div className='fixed w-[22rem] flex flex-col h-screen blackBG px-4 right-0 top-0 bottom-0 text-white text-base z-20'>
        <div className='relative flex space-x-2  items-center blackBorderBottom py-4 md:py-5'>
          <div className='justify-center items-center w-8 mr-2 h-8 md:w-14 md:h-14 flex relative group'>
            {!auth?.userInfo?.user?.avatar ? (
              <span className='w-8 h-8 md:w-14 md:h-14 text-xs md:text-base rounded-full text-black flexCenter font-semibold bg-slate-200'>
                <GetInitials fullName='Angel Cruz' />
              </span>
            ) : (
              <img
                src={auth?.userInfo?.user?.avatar}
                alt='user'
                className='w-8 h-8 md:w-14 md:h-14 rounded-full'
              />
            )}
          </div>

          <p  className='cursor-pointer'>
            Angel Cruz
          </p>

          <span
            className='absolute top-5.5 md:top-[40px] right-2'
            onClick={onClose}
          >
            <img
              src='/assets/images/sidebar/close.svg'
              alt='close'
              className='w-5 h-5 cursor-pointer'
            />
          </span>
        </div>

        <div className='flex flex-col screenHeightForSidebar overflow-y-auto h-full'>
          <div className=' flex space-x-2  items-center blackBorderBottom py-4'>
            <div className='justify-center items-center w-7 h-8 md:w-12 md:h-14 mr-2'>
              <img
                src='/assets/images/sidebar/droppCoin.svg'
                alt='coin'
                className='w-7 h-8 md:w-12 md:h-14'
              />
            </div>
            <div className=''>
              <p className='text-[.75rem] text-gray-300'>Reward Balance</p>
              <p className='text-[1.5rem] text-white pt-1 pb-1 font-bold'>
                1680
              </p>
            </div>
          </div>

          <div className=' w-full blackBorderBottom pt-2 pb-3 md:pt-3 md:pb-4'>
            <p className=' pt-3  py-1 font-semibold pb-3'>Pages</p>
            <div className='w-full py-2'>
              <p
                className='flex items-middle text-white/80 cursor-pointer'
                onClick={linkToDashboard}
              >
                <img
                  src='/assets/images/sidebar/dashboard.svg'
                  className=' w-4 h-4 inline'
                />{' '}
                <span className=' text-sm pl-2'> Dashboard</span>
              </p>
            </div>
            <div className='flex items-middle py-2'>
              <p className='flex items-middle text-white/80'>
                <a
                  href='https://droppgroup.xyz/#about'
                  target='_blank'
                  className='flexCenter'
                >
                  <img
                    src='/assets/images/sidebar/logo.png'
                    className=' w-4 h-3 inline '
                  />

                  <span className=' text-sm pl-2'> About dropp</span>
                </a>
              </p>
            </div>
            <div className='flex items-middle py-2'>
              <p className='flex items-middle text-white/80'>
                <a
                  href='https://c53bapy0wuf.typeform.com/to/J85xwc3D'
                  target='_blank'
                  className='flexCenter'
                >
                  <img
                    src='/assets/images/sidebar/support.svg'
                    className=' w-4 inline'
                  />{' '}
                  <span className=' text-sm pl-2'>Support</span>
                </a>
              </p>
            </div>
            <div className='flex items-middle py-2'>
              <p className='flex items-middle text-white/80'>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.00684 7.48V10.4733C2.00684 13.4667 3.20684 14.6667 6.20017 14.6667H9.7935C12.7868 14.6667 13.9868 13.4667 13.9868 10.4733V7.48'
                    stroke='#E6E6E6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7.99999 8C9.21999 8 10.12 7.00667 9.99999 5.78667L9.55999 1.33334H6.44666L5.99999 5.78667C5.87999 7.00667 6.77999 8 7.99999 8Z'
                    stroke='#E6E6E6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M12.2065 8C13.5532 8 14.5399 6.90667 14.4065 5.56667L14.2199 3.73334C13.9799 2 13.3132 1.33334 11.5665 1.33334H9.5332L9.99987 6.00667C10.1132 7.10667 11.1065 8 12.2065 8Z'
                    stroke='#E6E6E6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M3.75992 8C4.85992 8 5.85325 7.10667 5.95992 6.00667L6.10659 4.53334L6.42659 1.33334H4.39326C2.64659 1.33334 1.97992 2 1.73992 3.73334L1.55992 5.56667C1.42659 6.90667 2.41326 8 3.75992 8Z'
                    stroke='#E6E6E6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8.00016 11.3333C6.88683 11.3333 6.3335 11.8867 6.3335 13V14.6667H9.66683V13C9.66683 11.8867 9.1135 11.3333 8.00016 11.3333Z'
                    stroke='#E6E6E6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>

                <span
                  className=' text-sm pl-2 cursor-pointer'
                  onClick={addIntegration}
                >
                  {' '}
                  Marketplace
                </span>
              </p>
            </div>
          </div>


          <div className=' w-full blackBorderBottom  pt-2 pb-3 md:pt-3 md:pb-4 relative'>
            <div className='bg-black/80 absolute right-0 top-0 left-0 bottom-0 flexCenter'>
              Coming Soon...
            </div>
            <p className=' pt-3  py-1 font-semibold pb-3'>Integrations</p>
            <div className='flex items-middle py-1'>
              <p className='w-full text-white/80 flex justify-between'>
                <span className=' text-sm'>Live Integrations</span>
                {showIntegration && (
                  <span className='inline-block pr-3'>
                    <img
                      src='/assets/images/sidebar/toggle.svg'
                      className=' w-7 h-4 inline cursor-pointer'
                      onClick={toggleIntegration}
                    />
                  </span>
                )}
              </p>
            </div>

            {showIntegration && (
              <div className='w-full flex  flex-wrap'>
                <span
                  onClick={addIntegration}
                  className=' inline-block h-12 w-12 flexCenter darkGrayBg cursor-pointer darkGrayBgBorder roundedLg mx-1 my-1'
                >
                  <img
                    src='/assets/images/sidebar/shopify.svg'
                    className='w-7 h-7 opacity-40'
                  />
                </span>
                <span
                  onClick={addIntegration}
                  className=' inline-block h-12 w-12 flexCenter darkGrayBg cursor-pointer darkGrayBgBorder roundedLg mx-1 my-1 '
                >
                  <img
                    src='/assets/images/sidebar/wp.svg'
                    className='w-7 h-7 opacity-40'
                  />
                </span>

                <span
                  onClick={addIntegration}
                  className=' inline-block h-12 w-12 flexCenter darkGrayBg cursor-pointer darkGrayBgBorder roundedLg mx-1 my-1'
                >
                  <img
                    src='/assets/images/sidebar/appStore.svg'
                    className='w-7 h-7 opacity-40'
                  />
                </span>
                <span
                  onClick={addIntegration}
                  className=' inline-block h-12 w-12 flexCenter darkGrayBg cursor-pointer darkGrayBgBorder roundedLg mx-1 my-1 '
                >
                  <img
                    src='/assets/images/sidebar/android.svg'
                    className='w-7 h-7 opacity-40'
                  />
                </span>

              </div>
            )}
          </div>

          <div className=' w-full blackBorderBottom  pt-2 pb-3 md:pt-3 md:pb-4 relative pl-2'>
            <div className='bg-black/80 absolute right-0 top-0 left-0 bottom-0 flexCenter'>
              Coming Soon...
            </div>
            <p className=' pt-3  py-1 font-semibold pb-3'>Knowledge hub</p>
            
            
          </div>
        </div>
      </div>

      {showIntegrationPopup && (
        <IntegrationPopup onClosePopup={() => setShowIntegrationPopup(false)} />
      )}

      <div className='whiteOverlay fixed top-0 left-0 right-0 bottom-0 bg-white/10 z-10'></div>
    </div>
  );
}
