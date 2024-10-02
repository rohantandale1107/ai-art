import React from "react";

import {LOGOUT} from "../../Utils/index"
import { IoLogInOutline } from "../SVG/index";

const Setting = ({activeUser}) => {
  return <div>
    <div className="w-64 bg-zinc-800 z-50 fixed right-0 top-5 rounded-md drop-shadow shadow text-sm flex flex-col items-start overflow-hidden border border-zinc-700 sliderDownAndFade divide-y divide-zinc-700"
    style={{
      marginRight:"1rem",
      marginTop:"2rem"
    }}
    >
      <div className="px-4 py-2 bg-zinc-700 bg-opacity bg-opacity-50 w-full">
        <div className="flex items-center">
          <div className="rounded-full h-7 flex-shrink-0 w-7 flex items-center justify-center bg-zinc-800 mr-2">
            <p>{activeUser?.username.slice(0,1).toUpperCase()}</p>
          </div>

          <span className="font-medium truncate"> 
            {activeUser?.email}
          </span>
        </div>
      </div>
      <a href=""
        style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
        }}
        className="w-full px-4 py-2 hover:bg-zinc-700 flex justify-center"
        >
          Credit Left &nbsp; <IoLogInOutline/> &nbsp; {activeUser?.credit}
      </a>
      <a
      
        className="w-full px-4 py-2 hover:bg-zinc-700 flex justify-center"
        href="/account"
      >
        Buy Credit
      </a>
      <button onClick={()=>LOGOUT()} className="w-full px-4 py-2 hover:bg-zinc-700">
        Sign Out
      </button>
    </div>
  </div>;
};

export default Setting;
