import { useState } from "react";

function LatestTrending({ isLatest, handleClickLatest, handleClickTrending }) {
    return (
        <div className="my-8 flex justify-center">
            <div className="bg-white/20 p-3 text-white rounded-lg flex flex-row gap-5">
                <button
                    onClick={handleClickLatest}
                    className={`${isLatest ? "text-[#6CC1B6]" : "text-white"}`}
                >
                    Latest
                </button>
                <button
                    onClick={handleClickTrending}
                    className={`${!isLatest ? "text-[#6CC1B6]" : "text-white"}`}
                >
                    Trending
                </button>
            </div>
        </div>
    )
}

export default LatestTrending