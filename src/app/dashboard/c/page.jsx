'use client';
import ChatPrompt from '@/components/dashboard/chat/prompt/ChatPrompt';
import React, { useState, useEffect, useRef } from 'react';
import UserMessage from '@/components/dashboard/chat/common/UserMessage';
import Loading from '@/components/dashboard/chat/loading/Loading';
import AISpinner from '@/components/dashboard/chat/common/AISpinner';
import {
  selectChat,
  useDispatch,
  useSelector,
  selectAuth,
  resetWaterMarked,
} from '@/lib';
import ImagesPreview from '@/components/dashboard/chat/chatHistory/preview/ImagesPreview';
import ImagesPreviewFinal from '@/components/dashboard/chat/chatHistory/preview/ImagesPreviewFinal';

export default function ChatRoomDetail() {
  const [historyLoading, setHistoryLoading] = useState(false);
  const dispatch = useDispatch();
  const scrollToBox = useRef(null);
  const auth = useSelector(selectAuth);
  const isWaterMarked = auth?.isWatermarked;
  const [userPrompt, setUserPrompt] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [userPromptPlaceholder, setUserPromptPlaceholder] = useState(
    'What would you like to do today, AMiGO?'
  );
  const [history, setHistory] = useState([]);
  const [chatQuery, setChatQuery] = useState({
    prompt: '',
    step: 'initial',
    history: [],
    task: 'none',
    projectId: null,
    chatRoom: null,
    showUserInput: true,
  });

  const handleOnUserPromptChange = (value) => {
    setUserPrompt(value);
  };

  const handleOnUserPromptSubmit = () => {
    setDisabled(true);
    handleChatSubmit();
  };

  const resetPrompt = (e) => {
    setUserPrompt('');
    const textarea = document.getElementById('userPrompt');
    textarea.style.height = 'auto';
  };

  const handleChatSubmit = () => {
    if (!userPrompt) return;
    localStorage.setItem('stopStreaming', false);
    const historyData = history.map((item) =>
      item.id === localStorage.getItem('chatId')
        ? {
            ...item,
            isDone: true,
          }
        : item
    );
    const chatId = `${new Date().toISOString()}`;
    localStorage.setItem('chatId', chatId);
    setHistory([
      ...historyData,
      {
        id: chatId,
        type: 'spinner',
        question: userPrompt,
        answer: null,
        isDone: false,
        showUserInput: true,
      },
    ]);

    sendUserPrompt();
    resetPrompt();
  };

  const runInitialPromptApi = async () => {
    setChatQuery((prevState) => ({
      ...prevState,
      task: 'image',
      step: 'image',
    }));

    setHistory((prevState) =>
      prevState.map((item) =>
        item.id === localStorage.getItem('chatId')
          ? {
              ...item,
              type: 'loader',
              answer: null,
            }
          : item
      )
    );

    scrollToBottom();
    setUserPromptPlaceholder('Generating image...');

    setTimeout(() => {
      setHistory((prevState) =>
        prevState.map((item) =>
          item.id === localStorage.getItem('chatId')
            ? {
                ...item,
                type: 'image',
                answer: null,
              }
            : item
        )
      );
      setUserPromptPlaceholder('Would you like to remove the watermark?');
      setDisabled(false);
    }, 12000);
  };

  const sendUserPrompt = async () => {
    const userPromptValue = userPrompt.trim();
    if (!userPromptValue) return;

    if (chatQuery.task === 'digital') {
      // Add digital task handling logic here
    } else if (chatQuery.task === 'product') {
      // Add product task handling logic here
    } else {
      runInitialPromptApi(userPromptValue, auth.userInfo?.accessToken);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollToBox.current) {
        scrollToBox.current.scrollTop = scrollToBox.current.scrollHeight + 300;
      }
    }, 500);
  };

  useEffect(() => {
    dispatch(resetWaterMarked());
  }, []);

  useEffect(() => {
    if (isWaterMarked) {
      console.log('It is watermarked true');
    } else {
      const chatId = localStorage.getItem('chatId');
      setHistory((prevState) =>
        prevState.map((item) =>
          item.id === chatId
            ? {
                ...item,
                type: 'imageFinal',
                answer: null,
              }
            : item
        )
      );
      setDisabled(false);
      dispatch(resetWaterMarked());
      setUserPromptPlaceholder('What would you like to do today, AMiGO?');
    }
  }, [isWaterMarked]);

  return (
    <div className='w-full m-auto flex flex-col h-full px-3 md:px-0'>
      {historyLoading ? (
        <div className='w-full h-full flex items-center justify-center'>
          <svg
            className='animate-spin -ml-1 mr-3 h-16 w-16 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </div>
      ) : (
        <div className='scrollable-div flex-grow overflow-y-auto' ref={scrollToBox}>
          <div className='m-auto chat-area h-auto max-w-[55.5rem]'>
            {history?.map((data, ind) => (
              <div className='w-full block' key={ind}>
                {data.showUserInput && (
                  <UserMessage
                    avatar={auth?.userInfo?.user?.avatar}
                    name='Angel Cruz'
                    message={data.question}
                  />
                )}
                {data?.type === 'spinner' ? (
                  <AISpinner />
                ) : data?.type === 'loader' ? (
                  <Loading />
                ) : data?.type === 'imageFinal' ? (
                  <ImagesPreviewFinal />
                ) : (
                  data?.type === 'image' && <ImagesPreview />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <ChatPrompt
        onUserPromptSubmit={handleOnUserPromptSubmit}
        onUserPromptChange={handleOnUserPromptChange}
        placeHolderValue={userPromptPlaceholder}
        onChatStreaming=''
        onDisabled={disabled}
      />
    </div>
  );
}
