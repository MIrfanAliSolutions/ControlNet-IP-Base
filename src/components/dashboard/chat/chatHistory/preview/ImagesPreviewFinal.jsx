import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import ImagesSlider from "@/modals/chatHistory/ImagesSlider";
export default function ImagesPreviewFinal({ chatData, type, generationImage }) {
  const [showLargeView, setShowLargeView] = useState(false);
  const [largeImageSrc, setLargeImageSrc] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (imageSrc) => {
    setShowLargeView(true);
    setLargeImageSrc(imageSrc);
  };

  const downloadImage = (imageUrl, customFilename) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, customFilename);
      });
  };

  const handleDownload = () => {
    const imageUrl = '/assets/images/chat/final.jpeg';
    const customFilename = 'image.jpeg';
    downloadImage(imageUrl, customFilename);
  };

  return (
    <div className="pl-0 pr-2 md:px-5 pb-1 mt-3 md:mt-10">
      <div>
        <div className="flex space-x-2">
          <div className="text-white flex justify-center items-start uppercase rounded-[1.4rem] w-8 md:w-10 mr-2 flex-30 md:flex-48">
            <img
              src="/assets/images/chat/ai.png"
              alt="AiImage"
              className="w-8 md:w-10"
            />
          </div>
          <div className="w-full flex-1 relative">
            <div className="w-full bg-no-repeat bg-cover bgGrayImage p-2 md:p-4 relative rounded-xl flexCenter imageView">
              <div className="w-full flex justify-center">
                <div
                  className={`grid gap-4 p-4 py-4 justify-center allImages grid-cols-1`}
                >
                  <img
                    src='/assets/images/chat/final.jpeg'
                    className="w-full h-auto rounded-sm"
                    onClick={() => handleClick('/assets/images/chat/final.jpeg')}
                  />
                </div>
              </div>

              <button
                className="absolute bottom-8 right-8 cursor-pointer"
                onClick={() => setShowPopup(true)}
                onBlur={() => setShowPopup(false)}
              >
                <img
                  src="/assets/images/chat/info.svg"
                  className=" w-4 h-4 md:w-7 md:h-7"
                />
                {showPopup && (
                  <div className=" absolute bottom-full right-0 cursor-pointer text-xs z-10 bg-black text-white p-3 rounded-md w-56 leading-5">
                    For enhanced transparency and security, we tokenize all
                    assets enabling precise tracking and tracing.
                  </div>
                )}
              </button>
            </div>

            
              <div className="flex relative justify-start gap-2 h-5 mt-2">
                <img
                  src="/assets/images/chat/thumb_up.png"
                  className=" w-5 h-5 cursor-pointer like "
                />
                <img
                  src="/assets/images/chat/thumb_down.png"
                  className=" w-5 h-5 cursor-pointer dislike"
                />
                <img
                  src="/assets/images/chat/reset.png"
                  className=" w-5 h-5 cursor-pointer"
                />
                <img
                  src="/assets/images/chat/comment.png"
                  className=" w-5 h-5 cursor-pointer"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={handleDownload}
                  className="cursor-pointer"
                >
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="bg-gray-100 absolute right-0 top-1 rounded-xl px-2 py-1">
                  <a
                    href='https://explorer.solana.com/address/BWcB68VttkmfsMugjwBPoSoCwm6RbApdNH1tXFS7GeFv?cluster=devnet'
                    className=" text-gray-600 text-xs flexCenter cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="#fff"
                        className="w-4 h-4"
                      >
                        <path d="M7.628 1.099a.75.75 0 0 1 .744 0l5.25 3a.75.75 0 0 1 0 1.302l-5.25 3a.75.75 0 0 1-.744 0l-5.25-3a.75.75 0 0 1 0-1.302l5.25-3Z" />
                        <path d="m2.57 7.24-.192.11a.75.75 0 0 0 0 1.302l5.25 3a.75.75 0 0 0 .744 0l5.25-3a.75.75 0 0 0 0-1.303l-.192-.11-4.314 2.465a2.25 2.25 0 0 1-2.232 0L2.57 7.239Z" />
                        <path d="m2.378 10.6.192-.11 4.314 2.464a2.25 2.25 0 0 0 2.232 0l4.314-2.465.192.11a.75.75 0 0 1 0 1.303l-5.25 3a.75.75 0 0 1-.744 0l-5.25-3a.75.75 0 0 1 0-1.303Z" />
                      </svg>
                    </span>
                    <span className="inline-block pl-1 max-w-48">
                      Tokenized NFT Url
                    </span>
                  </a>
                </div>
              </div>
            
          </div>
        </div>
      </div>

      {showLargeView && (
        <ImagesSlider
          imageSrc={largeImageSrc}
          onClose={() => setShowLargeView(false)}
          images={generationImage?.map((image) => image?.content?.url || image)}
        />
      )}
    </div>
  );
}
