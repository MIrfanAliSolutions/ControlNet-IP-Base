import GetInitials from '@/components/common/GetInitials';

export default function UserMessage({ avatar, name, message }) {
  return (
    <div className='pl-0 pr-2 md:px-5 pb-1 mt-3 md:mt-10'>
      <div>
        <div className=' flex space-x-2'>
          <div className='  text-white flex justify-center items-start uppercase rounded-[1.4rem] w-8 md:w-10 mr-2  flex-30 md:flex-48'>
            {avatar == null ? (
              <span className=' w-[1.85rem] h-[1.85rem] md:w-10 md:h-10 text-xs md:text-base rounded-full text-black flexCenter font-semibold bg-slate-200'>
                <GetInitials fullName={name} />
              </span>
            ) : (
              <img
                src={`${avatar}`}
                alt='userImage'
                className='w-8 md:w-10 h-8 md:h-10 object-cover rounded-full'
              />
            )}
          </div>
          <div className='bg-[#5f6369] text-white w-full p-2 md:p-4 rounded-xl flex-1'>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
