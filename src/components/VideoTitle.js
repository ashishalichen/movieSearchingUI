import React from "react";

function VideoTitle({ title, overview }) {
  return (
    <div className="w-screen aspect-video pt-[25%] px-6 absolute text-white bg-gradient-to-r from-black to-transparent">
      <h1 className="text-xl md:font-bold text-4xl">{title}</h1>
      <p className="hidden md:inline-block text-lg w-1/2 py-4">{overview}</p>
    </div>
  );
}

export default VideoTitle;
