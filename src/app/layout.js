'use client';
import { usePathname } from 'next/navigation';
import BackgroundVideo from '@/components/common/BackgroundVideo';
import StoreProvider from './StoreProvider';
import Navbar from '@/components/header/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

export default function RootLayout({ children }) {

  return (
    <html lang='en'>
      <head>
        <title>dropp</title>
      </head>
      <body className='relative '>
        <StoreProvider>
          <BackgroundVideo />
          <Navbar />

          <div className={`w-full block screenHeight`}>{children}</div>
        </StoreProvider>
        <ToastContainer
          position={'top-center'}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </body>
    </html>
  );
}
