import { useState } from "react";

function LatestTrending({ isLatest, handleClickLatest, handleClickTrending }) {
    return (
        <div className="mt-4 sm:mt-8 mb-4 sm:mb-6 flex justify-center">
            <div className="bg-white/20 p-1 text-white rounded-lg flex flex-row gap-1">
                <button
                    onClick={handleClickTrending}
                    className={`px-4 py-2 rounded-md ${
                        !isLatest ? "bg-black text-[#6CC1B6]" : "bg-transparent text-white"
                    }`}
                >
                    Trending
                </button>
                <button
                    onClick={handleClickLatest}
                    className={`px-4 py-2 rounded-md ${
                        isLatest ? "bg-black text-[#6CC1B6]" : "bg-transparent text-white"
                    }`}
                >
                    Latest
                </button>
            </div>
        </div>
    );
}

export default LatestTrending;
