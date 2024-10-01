import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import {
  HeaderLogo,
  Account,
  Generate,
  History,
  Home,
  Likes,
} from "../SVG/index";

import Setting from "./Setting";
import { CHECK_AUTH } from "../../Utils/index";

const Header = () => {
  const [auth, setAuth] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [activeUser, setActiveUser] = useState();

  const navList = [
    {
      menu: "Home",
      link: "/",
    },
    {
      menu: "Generate",
      link: "/aperture",
    },
    {
      menu: "History",
      link: "/history",
    },
    {
      menu: "Likes",
      link: "/likes",
    },
    {
      menu: "Account",
      link: "/account",
    },
  ];

  const CALL_USER_DETAILS = async () => {
    try {
      const user = await CHECK_AUTH();
      console.log(user.credit);
      setActiveUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedCookieValue = Cookies.get("token");
    if (storedCookieValue) {
      CALL_USER_DETAILS();
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <div className="fixed w-screen bottom-0 sm:top-0 z-50 flex flex-row items-center justify-between background-blur bg-opacity-80 border-t sm:border-t-0 sm:border-b border-opacity-50 text-sm select-none bg-zinc-900 border-t-zinc-700 sm:border-b-zinc-700"
    style={{
      height:56,
    }}
    >
      <a href="/" className="hidden sm:flex items-center cursor-pointer px-4 pl-6 left-0 h-full w-32">
        <HeaderLogo/>
      </a>

      <div className="flex relative items-center h-full -mt-1 w-full sm:w-auto">
        <div className="absolute rounded bg-zinc-700" style={{
          height:32,
          top:25,
          width:0,
          opacity:1,
          transform:"none",
        }}/>
          {navList.map((menu,index)=>{
            return (<a
              key={index}
              className="flex flex-row items-center cursor-pointer h-full py-1.5 pb-0 justify-center transition-all flex-1"
              href={menu.link}
              style={{
                width:80, zIndex:2, opacity:"0.5",
              }}


              >
                <div className="relative sm:flex justify-center hidden w-full">
                  <div className="absolute w-full"
                  style={{
                    borderBottom:"2.5px solid transparent",
                    bottom:"-17px",
                  }}/>
                    <span className="">{menu.menu}</span>
                  
                </div>
                {
                  menu.menu=="Home" ? (
                    <Home/>
                  ) : menu.menu=="Generate" ? (
                    <Generate/>
                  ): menu.menu=="History"?(
                    <History/>
                  ):menu.menu=="Likes" ?(
                    <Likes/>
                  ):(
                    <Account/>
                  )
                }
              </a>
            )
          })}
        </div>
        {auth ? (
          <div className="hidden w-32 h-full sm:flex items-center justify-end mr-6">
            <button className="h-7 w-7 rounded-full text-xs md:text-sm bg-zinc-800 border border-zinc-8-700 drop-shadow flex items-center justify-center opacity-80 hover:opacity-100"
            type="button"
            onClick={()=>
              openSetting ? setOpenSetting(false): setOpenSetting(true)
            }
            >
              {activeUser?.username.slice(0,1).toUpperCase()}
            </button>
            {openSetting && <Setting activeUser={activeUser}/>}
          </div>
        ): (
          <div className="hidden w-32 h-full sm:flex items:center justify-end mr-6">
            <a href="/login"
            className="flex items-center justify-center h-8 rounded-md opacity-90 hover:brightness-110 px-4 text-xs md:text-sm bg-gradient-to-t from-indigo-800 via-indigo-800 to-indigo-600 drop-shadow font-medium whitespace-nowrap mt-3"
            >
              Get Started
            </a>
          </div>
        )}

      </div>
    
  );
};

export default Header;
