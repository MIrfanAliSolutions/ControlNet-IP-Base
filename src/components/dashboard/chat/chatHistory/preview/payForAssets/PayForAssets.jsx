'use client';
import React, { useState } from 'react';
import useApiHook from '@/hooks/useApiHook';
import { RotatingLines } from 'react-loader-spinner';
import {
  updateBalance,
  updateWaterMarked,
  useDispatch,
  useSelector,
  selectAuth,
} from '@/lib'; 
const PayForAssets = ({
  onClose
}) => {
  const dispatch = useDispatch();
  const { handleApiCall, isApiLoading } = useApiHook();
  const [showLoading, setShowLoading] = useState(false);
  const auth = useSelector(selectAuth);

  const proceedToPayment = async () => {
    setShowLoading(true);
    setTimeout(() => {
      dispatch(
        updateWaterMarked()
      );
      dispatch(
        updateBalance('1850')
      );
        onClose();
        setShowLoading(false);
    }, 1500);
    
    
  };

  return (
    <div className='fixed top-0 left-0 right-0 w-screen z-50 flex items-center justify-center h-full min-h-screen m-auto px-5 md:px-0 bg-white/20'>
      <div className='relative max-w-[26rem] overflow-hidden m-auto flex flex-col justify-center items-start w-full text-white px-3 py-5 md:p-8 darkGrayBg2 rounded-2xl border border-gray-100'>
        <div className='flexCenter w-full'>
          <img src='/assets/images/chat/download.png' className=' w-24' />
        </div>
        <div className='w-full py-4 text-center'>
        <p className='text-xs text-white/60 font-light px-4 leading-6  '>
            Nintendo is detected as a intellectual property owner
          </p>
          <p className='text-3xl font-semibold leading-10 py-2 capitalize'>
          intellectual Property Detected
          </p>
          <p className='text-xs text-white/60 font-light px-4 leading-6'>
            This AI-generated artwork may include third-party intellectual property like logos or copyrighted images.
          </p>
        </div>

        <div className='w-full block'>
          <p className='text-sm text-gray-400 font-bold  py-2'>Total Price</p>
          <div className='flex items-center justify-between py-2'>
            <div className='flex items-center justify-start'>
              <img src='/assets/images/sidebar/droppCoin.svg' className='w-9' />
              <p className='text-lg font-bold pl-4'>droppCoin</p>
            </div>
            <div>
              <input
                type='text'
                className='darkGrayBg rounded-md w-20 h-12 p-4 text-sm'
                readOnly
                value='100'
              />
            </div>
          </div>
        </div>

        <div className='w-full pt-5 mt-3 justify-around border-t  border-gray-300'>
          {showLoading ? (
            <div className='flexCenter p-2 w-full'>
              <RotatingLines
                height='28'
                width='28'
                color='gray'
                strokeColor='white'
                strokeWidth='5'
                animationDuration='0.75'
                ariaLabel='rotating-lines-loading'
              />
            </div>
          ) : (
            <div className='grid grid-cols-2 space-x-4'>
              <button
                type='submit'
                disabled={showLoading}
                onClick={() => onClose()}
                className='bg-transparent font-semibold hover:opacity-80 text-sm text-white flexCenter rounded-xl py-3 border border-white flex-grow'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={showLoading}
                onClick={proceedToPayment}
                className='bg-Gradient font-semibold text-sm text-black flexCenter rounded-xl py-3 hover:opacity-80 flex-grow'
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayForAssets;
