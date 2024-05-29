'use client';
import { selectAuth } from '@/lib';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Footer = () => {
  const auth = useSelector(selectAuth);

  return (
    <div className='relative text-[10px] md:text-base flex flex-wrap w-full justify-center pb-10'>
      <Link
        className='text-white font-semibold hover:text-blue-700'
        href={auth?.isLogin ? '/dashboard/c' : '/'}
      >
        Home
      </Link>
      <span className='mx-1 text-white'>|</span>
      <Link
        className='text-white font-semibold hover:text-blue-700'
        href='/privacy-policy'
      >
        Privacy Policy
      </Link>
      <span className='mx-1 text-white'>|</span>
      <Link
        className='text-white font-semibold hover:text-blue-700'
        href='/terms-of-services'
      >
        Terms of Service
      </Link>
      <span className='mx-1 text-white'>|</span>
      <Link
        className='text-white font-semibold hover:text-blue-700'
        href='/cookie-policy'
      >
        Cookie Policy
      </Link>
    </div>
  );
};

export default Footer;
