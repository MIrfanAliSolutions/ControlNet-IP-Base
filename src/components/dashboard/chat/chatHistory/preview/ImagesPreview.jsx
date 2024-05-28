import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import ImagesSlider from "@/modals/chatHistory/ImagesSlider";
import PayForAssets from "./payForAssets/PayForAssets";
import {
  useSelector,
  selectAuth,
} from '@/lib';
export default function ImagesPreview({ chatData, type, generationImage }) {
  const [showLargeView, setShowLargeView] = useState(false);
  const [largeImageSrc, setLargeImageSrc] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentModel, setShowPaymentModel] = useState(false);
  const [showPointsBar, setShowPointsBar] = useState(false);
  const auth = useSelector(selectAuth);
  let url = '';
  if(auth.isBuzz)
    {
      url = '/assets/images/chat/pixarInitial.jpeg';
    }
    else
    {
      url = '/assets/images/chat/initial.jpeg';
    }
  const handleClick = (imageSrc) => {
    setShowLargeView(true);
    setLargeImageSrc(imageSrc);
  };

  const payForAsset = () => {
    setShowPaymentModel(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowPointsBar(true);
    }, 1500);
  }, []);

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
                    src={url}
                    className="w-full h-auto rounded-sm"
                    onClick={() => handleClick(url)}
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

              <button className=" text-xs absolute left-8 bottom-8 bg-Gradient font-semibold rounded-lg px-4 py-3 shadow z-10 payforAssetBtn">
                <span>Would you like to remove the watermark? </span>{" "}
                <span onClick={payForAsset} className=" font-extrabold">
                  Click here
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModel && (
        <PayForAssets
          type="image"
          onClose={() => setShowPaymentModel(false)}
          chatId={chatData?._id}
          chatRoomId={chatData?.chatRoom}
        />
      )}

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
