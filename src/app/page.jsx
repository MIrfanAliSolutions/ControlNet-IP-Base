'use client';
import { selectAuth, useSelector } from '@/lib';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Waitlist() {
  const auth = useSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (!auth?.isLogin) router.push('/sign-in');
    else router.push('/dashboard/c');
  }, []);

  return (
    <div className='flex flex-col justify-center h-full items-center text-white min-w-80 p-5'>
    </div>
  );
}
