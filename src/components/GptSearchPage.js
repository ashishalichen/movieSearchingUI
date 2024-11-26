import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_IMG } from '../utils/constant';

function GptSearchPage() {
  return (
    <>
      <div className="fixed -z-10">
        <img className='h-screen w-screen object-cover' src={BG_IMG} alt="logo" />
      </div>
      <div className=''>

        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
}

export default GptSearchPage