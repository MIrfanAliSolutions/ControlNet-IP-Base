import React, { useEffect, useState, useRef } from 'react';
import useApiHook from '@/hooks/useApiHook';
import Link from 'next/link';

let searchTimer;

export default function UniversalSearch() {
  const { handleApiCall } = useApiHook();
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);
  const searchFieldRef = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(searchTimer);
    };
  }, []);

  const handleSearch = async (e) => {
    const title = e.target.value;
    setSearchTerm(title);

    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    if (title.length > 2) {
      searchTimer = setTimeout(async () => {
        const result = await handleApiCall({
          method: 'GET',
          url: `/projects/universal-search?title=${title}`,
        });

        if (result.status === 200) {
          setProjects(result?.data?.projects);
          setChatRooms(result?.data?.chatRooms);
          if (
            result?.data?.projects.length > 0 ||
            result?.data?.chatRooms.length > 0
          ) {
            setShowSearch(true);
            setShowNoResult(false);
          } else {
            setShowNoResult(true);
            setTimeout(() => {
              setShowNoResult(false);
            }, 2000);
            setShowSearch(false);
          }
        }
      }, 500);
    } else {
      setProjects([]);
      setChatRooms([]);
      setShowSearch(false);
      setShowNoResult(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setProjects([]);
    setChatRooms([]);
    setShowSearch(false);
    setShowNoResult(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchFieldRef.current &&
        !searchFieldRef.current.contains(event.target)
      ) {
        clearSearch();
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='items-center justify-center w-full max-w-60 lg:max-w-96 hidden md:flex'>
      <div ref={searchFieldRef} className='searchField w-full relative'>
        <input
          placeholder='Search...'
          className='w-full text-gray-700 text-base leading-3 md:leading-5 py-3 px-3 rounded-xl border border-solid bg-black border-lightGray-200 bg-black-200'
          type='text'
          onChange={handleSearch}
          value={searchTerm}
        />

        {showSearch && (
          <div className='h-auto max-h-96 overflow-y-auto w-full bg-black border border-gray-150 rounded-sm text-white px-3 pb-3 absolute top-14 z-10'>
            {projects.length > 0 && (
              <div className='w-full'>
                <h3 className='text-gray-400 font-bold uppercase text-sm pb-2 pt-3'>
                  Projects
                </h3>
                {projects.map((project, index) => (
                  <Link
                    href={`/dashboard/p/${project._id}`}
                    onClick={clearSearch}
                    className='flex items-center px-1 py-1 text-sm text-white-200 cursor-pointer hover:bg-gray-100'
                    key={index}
                  >
                    <span
                      className='bg-white h-4 w-4 rounded-sm inline-block mr-2'
                      style={{ backgroundColor: project.colorCode }}
                    ></span>
                    {project.title.length > 50
                      ? `${project.title.slice(0, 50)} ...`
                      : project.title}
                  </Link>
                ))}
              </div>
            )}

            {chatRooms.length > 0 && (
              <div className='w-full'>
                <h3 className='text-gray-400 font-bold uppercase text-sm pb-2 pt-3'>
                  Chat Rooms
                </h3>
                {chatRooms.map((chatroom, index) => (
                  <Link
                    href={`/dashboard/c/${chatroom?._id}`}
                    onClick={clearSearch}
                    className='flex items-center px-1 py-1 text-sm text-white-200 cursor-pointer hover:bg-gray-100'
                    key={index}
                  >
                    {chatroom.title.length > 50
                      ? `${chatroom.title.slice(0, 50)} ...`
                      : chatroom.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {showNoResult && (
          <div className='w-full bg-black border border-gray-150 rounded-sm text-white p-4 absolute top-14 z-10'>
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
