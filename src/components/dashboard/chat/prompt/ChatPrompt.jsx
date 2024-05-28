import { useState, useEffect, useRef } from 'react';
import useApiHook from '@/hooks/useApiHook';
export default function ChatPrompt({
  onUserPromptSubmit,
  onUserPromptChange,
  placeHolderValue,
  onChatStreaming,
  onDisabled,
}) {
  const textareaRef = useRef(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [disabled, setDisabled] = useState(onDisabled);
  const handleChange = (e) => {
    setUserPrompt(e.target.value);
    onUserPromptChange(e.target.value);
    const textarea = document.getElementById('userPrompt');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const resetPrompt = (e) => {
    setUserPrompt('');
    onUserPromptChange('');
    const textarea = document.getElementById('userPrompt');
    textarea.style.height = 'auto';
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userPrompt) return;
    onUserPromptSubmit();
    resetPrompt();
  };

  useEffect(() => {
    if (!onDisabled && textareaRef.current) {
      //textareaRef.current.focus();
    }
  }, [onDisabled, onChatStreaming]);

  return (
    <div className='Chat-area flex flex-col justify-center pt-4 md:pt-9 md:pb-3 w-full m-auto  max-w-[55.5rem]'>
      <form onSubmit={handleChatSubmit} className='w-full'>
        <div className='flex space-x-0 md:space-x-2 pr-0 md:pr-3'>
          <div className='hidden md:flex justify-center items-center uppercase rounded-[1.4rem] w-8 h-8 md:w-12 md:h-12 mr-2'></div>
          <div className='w-full relative inputBorder'>
            <textarea
              ref={textareaRef}
              id='userPrompt'
              rows='1'
              type='text'
              name='user_prompt'
              disabled={onChatStreaming || onDisabled}
              value={userPrompt}
              onChange={handleChange}
              onKeyDown={(e) => {
                e.key === 'Enter' && !e.shiftKey && handleChatSubmit(e);
              }}
              className={`text-white/70 pl-3 pr-14 md:pr-28 block w-full py-3 md:py-4 rounded-2xl bg-black resize-none text-xs md:text-xl overflow-hidden border border-white/60 ${
                onChatStreaming || onDisabled ? 'cursor-not-allowed' : ''
              }`}
              autoComplete='off'
              placeholder={placeHolderValue}
            ></textarea>

            {!onChatStreaming && (
              <button
                type='submit'
                className='bg-Gradient absolute right-2 top-2.5 md:top-2 py-1 px-1 md:py-2 md:px-2 rounded-md flex items-center justify-center text-black'
              >
                <svg
                  className=' w-5 h-3 md:w-7 md:h-6'
                  width='28'
                  height='23'
                  viewBox='0 0 28 23'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M25.3313 0.362855L25.3223 0.363884L1.55728 3.53719C1.35705 3.56329 1.16519 3.63766 0.998857 3.75365C0.832523 3.86964 0.696905 4.02363 0.604134 4.20186C0.504867 4.38794 0.453527 4.59416 0.454733 4.80196C0.455939 5.00975 0.509653 5.21261 0.611043 5.39227L3.42771 10.3697C3.56669 10.6151 3.78965 10.8028 4.05816 10.9004C4.32666 10.998 4.6239 10.9995 4.89862 10.9045L16.5289 6.82138C16.5747 6.80553 16.6243 6.80576 16.669 6.82203C16.7138 6.83831 16.751 6.86962 16.7741 6.91055C16.7973 6.95148 16.805 6.99947 16.7959 7.04623C16.7868 7.093 16.7615 7.13561 16.7243 7.16672L7.23615 15.0342C7.01328 15.2207 6.8614 15.476 6.80667 15.7563C6.75194 16.0367 6.79778 16.3244 6.93631 16.5699L9.75348 21.5482C9.85038 21.7197 9.98969 21.8637 10.1589 21.9673C10.3282 22.0709 10.522 22.1308 10.7231 22.1416C10.9654 22.1555 11.2085 22.0987 11.4219 21.9782C11.57 21.8942 11.7004 21.7824 11.8054 21.6492L26.7868 2.95509L26.7932 2.94626C26.9924 2.69024 27.1124 2.38437 27.1385 2.0665C27.1647 1.74862 27.0957 1.43269 26.9401 1.15778C26.7845 0.882868 26.5492 0.66105 26.2633 0.519764C25.9773 0.378478 25.6533 0.323925 25.3313 0.362855Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            )}

            {onChatStreaming && (
              <button
                className='absolute right-2 top-2.5 md:top-2 py-1 px-1 md:py-2 md:px-2 rounded-md flex items-center justify-center'
                onClick={() => localStorage.setItem('stopStreaming', true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#FFFFFF'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z'
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>
      <p className='text-white/70 text-center text-xs pt-3 '>
        We advise verifying key information due to potential inaccuracies
      </p>
    </div>
  );
}
