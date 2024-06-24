import React, { useState, useCallback, useEffect } from "react";
import update from "immutability-helper";
import DraggableCard from "./DraggableCard";
import MkdSDK from "../utils/MkdSDK";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const sdk = new MkdSDK();

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const fetchVideos = async (page) => {
    try {
      const response = await sdk.callRestAPI(
        { payload: {}, page: page, limit: 10 },
        "PAGINATE"
      );

      if (!response.error) {
        setVideos(response.list);
        setTotalPages(response.num_pages);
      } else {
        console.error("Failed to fetch videos: ", response.message);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedCard = videos[dragIndex];
      setVideos(
        update(videos, {
          $splice: [
            [dragIndex, 1], // Removes the dragged items from it's position (1 item)
            [hoverIndex, 0, draggedCard], // Inserts the draggedCard into the hoveredIndex spot (0 items to remove)
          ],
        })
      );
    },
    [videos]
  );

  const handlePrevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="bg-[#111111] pb-14">
      {videos.map((video, index) => (
        <DraggableCard
          key={video.id}
          index={index}
          id={video.id}
          video={video}
          moveCard={moveCard}
        />
      ))}

      <div className="flex justify-end w-full text-sm italic text-white px-14">
        Page: {page}
      </div>

      <div className="flex justify-center gap-8 mt-12">
        <button
          className={`text-[#696969] flex items-center gap-2 border-solid border-[3px] border-[rgba(255,_255,_255,_0.12)] p-3 rounded-lg ${
            page === 1 ? "cursor-not-allowed" : " "
          }`}
          onClick={handlePrevPage}
        >
          <GrLinkPrevious size={15} className="text-[#9BFF00]" /> Prev
        </button>
        <button
          className="text-[#696969] flex items-center gap-2 border-solid border-[3px] border-[rgba(255,_255,_255,_0.12)] p-3 rounded-lg"
          onClick={handleNextPage}
        >
          Next <GrLinkNext size={15} className="text-[#9BFF00]" />
        </button>
      </div>
    </div>
  );
};

export default VideoList;
