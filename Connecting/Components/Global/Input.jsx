import React from "react";

const Input = ({ placeholder, handleChange, styleCss, type }) => {
  return (
  <input
    style={{
      marginTop:styleCss,
    }}
    placeholder={placeholder}
    type={type}
    className="w-64 px-3 py-2 bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg border border-zinc-600 hover:brightness-110"
    onChange={handleChange}
  />
  
  
  )
};

export default Input;
