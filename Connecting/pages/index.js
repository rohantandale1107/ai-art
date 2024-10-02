import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

//internal import
import {
  HomeLogo,
  Search,
  Image,
  Filter,
  FaHeart,
  FaInstagram,
  AiOutLineYoutube,
  BsCameraReelsFill,
  FaRegHeart,
  Magic,
} from "../Components/SVG/index";

import {
  Header,
  GetStarted,
  ImageCard,
  SingleImage,
  ApertImageCard,
  Notic,
  Button,
  PaymentProcessing,
} from "../Components/index";

import { GET_AI_IMAGES, CHECK_AUTH } from "../Utils/index";

const index = () => {
  const { query } = useRouter();

  const [openFilter, setOpenFilter] = useState(false);
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState("Reel");
  const [singleID, setSingleID] = useState();
  const [buying, setBuying] = useState();

  const [activeUser, setActiveUser] = useState();
  const [allAIImages, setAllAIImages] = useState();
  const [allPostCopy, setAllPostCopy] = useState([]);

  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  //v3
  const [V3_1024x1024, setV3_1024x1024] = useState();
  const [V3_1792x1024, setV3_1792x1024] = useState();
  const [V3_1024x1792, setV3_1024x1792] = useState();

  //v2
  const [V2_256x256, setV2_256x256] = useState();
  const [V2_512x512, setV2_512x512] = useState();
  const [V2_1024x1024, setV2_1024x1024] = useState();

  useEffect(() => {
    if (query.CREDIT_PLAN) {
      setBuying(query.CREDIT_PLAN);
    }
  }, [query.CREDIT_PLAN]);

  const changeCategory = (category) => {
    const model = localStorage.getItem("ACTIVE_MODEL");

    if (model == "AI Image Art Dall-e-v2") {
      if (category == "Reel") {
        setAllAIImages(V2_256x256);
        setAllPostCopy(V2_256x256);
        setCategory("Reel");
      } else if (category == "Instagram") {
        setAllAIImages(V2_512x512);
        setAllPostCopy(V2_512x512);
        setCategory("Instagram");
      } else if (category == "Youtube") {
        setAllAIImages(V2_1024x1024);
        setAllPostCopy(V2_1024x1024);
        setCategory("Youtube");
      }
    } else {
      if (category == "Reel") {
        setAllAIImages(V3_1024x1792);
        setAllPostCopy(V3_1024x1792);
        setCategory("Reel");
      } else if (category == "Instagram") {
        setAllAIImages(V3_1024x1024);
        setAllPostCopy(V3_1024x1024);
        setCategory("Instagram");
      } else if (category == "Youtube") {
        setAllAIImages(V3_1792x1024);
        setAllPostCopy(V3_1792x1024);
        setCategory("Youtube");
      }
    }
  };

  const CALLING_ALL_POSTS = async () => {
    try {
      const response = await GET_AI_IMAGES();

      console.log(response);

      const V2_256x256Temp = [];
      const V2_512x512Temp = [];
      const V2_1024x1024Temp = [];

      const V3_1024x1024Temp = [];
      const V3_1024x1792Temp = [];
      const V3_1792x1024Temp = [];

      response.forEach((el) => {
        if (el.aiModel === "AI Image Art Dall-e-v2") {
          if (el.size === "256x256") {
            V2_256x256Temp.push(el);
          } else if (el.size === "512x512") {
            V2_512x512Temp.push(el);
          } else if (el.size === "1024x1024") {
            V2_1024x1024Temp.push(el);
          }
        } else if (el.aiModel === "AI Image Art Dall-e-v3") {
          if (el.size === "1024x1024") {
            V3_1024x1024Temp.push(el);
          } else if (el.size === "1024x1792") {
            V3_1024x1792.push(el);
          } else if (el.size === "1792x1024") {
            V3_1792x1024Temp.push(el);
          }
        }
      });

      setV2_256x256(V2_256x256Temp);
      setV2_512x512(V2_512x512Temp);
      setV2_1024x1024(V2_1024x1024Temp);

      setV3_1024x1024(V3_1024x1024Temp);
      setV3_1024x1792(V3_1024x1792Temp);
      setV3_1792x1024(V3_1792x1024Temp);

      const model = localStorage.getItem("ACTIVE_MODEL");
      if (model === "AI Image Art Dall-e-v2") {
        setAllAIImages(V2_256x256Temp);
        setAllPostCopy(V2_256x256Temp);
      } else {
        setAllAIImages(V3_1024x1792Temp);
        setAllPostCopy(V3_1024x1792Temp);
      }

      const storedCookiedValue = Cookies.get("token");
      if (storedCookiedValue) {
        const user = await CHECK_AUTH();
        setActiveUser(user);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CALLING_ALL_POSTS();
  }, []);

  const onHandleSearch = (value) => {
    const filterPosts = allAIImages?.filter(({ prompt }) =>
      prompt.toLowerCase().includes(value.toLowerCase())
    );
    if (filterPosts.length === 0) {
      setAllAIImages(allPostCopy);
    } else {
      setAllAIImages(filterPosts);
    }
  };

  const onClearSearch = () => {
    if (allAIImages?.length && allPostCopy?.length) {
      setAllAIImages(allPostCopy);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  const arrayRender = [...(allAIImages?.reverse() || [])];
  return (
    <div>
      <Header />
      <div className="mb-[56px] sm:mb-0 sm:mt-[56px]">
        <div className="flex flex-col">
          <GetStarted activeUser={activeUser} />
          <div className="w-screen overflow-x-hidden flex flex-col items-center py-4 mt-16">
            <a href="/">
              <HomeLogo />
            </a>
            <a href="/aperture" className="cursor-pointer">
              <p className="mt-2 text-xs text-indigo-300 active:scale-95 text-center font-medium shadow-sm hover:shadow-md bg-indigo-300 bg-opacity-5 hover:bg-opacity-10 border border-indigo-300 border-opacity-10 hover:border-opacity-20 transition-all rounded-md px-6 py-2 ">
                AI Image 10.5 is here!
              </p>
            </a>
            <div className="flex flex-items-center w-full max-w-[600px] md:ml-[48px] mt-8 px-4 pl-5 md:px-5">
              <div className="w-full">
                <div
                  className="w-full flex items-center relative"
                  onClick={() => changeCategory("Filter")}
                >
                  <Search />
                  <input
                    className="bg-zinc-700 flex-1 pl-12 pr-12 rounded-full text-sm px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                    placeholder="Search for an image"
                    onChange={(e) => setSearchItem(e.target.value)}
                    value={searchItem}
                  />

                  <button
                    type="button"
                    className="text-base absolute right-2 hover:bg-zinc-800 h-8 w-8 flex items-center justify-center rounded-full"
                  >
                    <Image />
                  </button>
                </div>
              </div>
              <div className="flex justify-center ">
                <button
                  onClick={() =>
                    openFilter ? setOpenFilter(false) : setOpenFilter(true)
                  }
                  type="button"
                  className="ml-2 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center bg-transparent hover:bg-zinc-900"
                >
                  <Filter />
                </button>
              </div>
            </div>
            <div
              className="flex w-full max-w-[600px] md:ml-[48px] px-4 pl-5 md:px-5"
              style={{
                position: "relative",
              }}
            />
              {openFilter && <Notic />}
              
              <div className="mb-8 flex flex-col items-center">
                <div className="flex space-x-2">
                  <button className="w-32 sm:w-36 flex items-center text-xs justify-center text-center h-9 rounded-full hover:brightness-110 bg-opacity-0 shadow-sm mt-4 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800">
                    Search
                  </button>
                  <a href="/aperture">
                    <button className="w-32 sm:w-36 h-9 mt-4 flex items-center justify-center text-xs text-center rounded-full border border-gray-700 shadow-sm bg-opacity-0 hover:bg-zinc-700 hover:brightness-110">
                      Generate
                    </button>
                  </a>
                </div>
              </div>
              <div className="flex space-x-2 px-2">
                <Button
                  icon={<BsCameraReelsFill />}
                  name={"Reel"}
                  handleClick={() => changeCategory("Reel")}
                  category={category}
                />
                <Button
                  icon={<AiOutLineYoutube />}
                  name={"Youtube"}
                  handleClick={() => changeCategory("Youtube")}
                  category={category}
                />
                <Button
                  icon={<FaInstagram />}
                  name={"Instagram"}
                  handleClick={() => changeCategory("Instagram")}
                  category={category}
                />
              </div>
              <div className="mt-2">&nbsp;</div>
              <div className="mt-3 relative px-2 md:px-7 w-full">
                <div
                  className="active:outline-none focus:outline-none overflow-hidden new-css-style-box"
                  role="grid"
                  tabIndex={0}
                  style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                    listStyle: "none",
                    margin: "0",
                    padding: "0",
                    gap: ".1rem",
                  }}
                >
                  <>
                    {arrayRender?.reverse().map((item, index) => (
                      <ImageCard
                        index={index}
                        item={item}
                        setSingleID={setSingleID}
                        activeUser={activeUser}
                      />
                    ))}
                  </>
                </div>
              </div>
            
          </div>
        </div>
      </div>

      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}

      {buying && <PaymentProcessing buying={buying} setBuying={setBuying} />}
    </div>
  );
};

export default index;
