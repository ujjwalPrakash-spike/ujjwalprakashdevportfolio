import React from "react";

export default function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none flex justify-between z-0">
      <div className="w-[1px] h-full bg-black/5 ml-10"></div>
      <div className="w-[1px] h-full bg-black/5 ml-[25%] absolute left-0"></div>
      <div className="w-[1px] h-full bg-black/5 left-[50%] absolute"></div>
      <div className="w-[1px] h-full bg-black/5 right-[25%] absolute"></div>
      <div className="w-[1px] h-full bg-black/5 mr-10 right-0 absolute"></div>
    </div>
  );
}
