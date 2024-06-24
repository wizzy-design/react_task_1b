import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { GoArrowUp } from "react-icons/go";

const ItemType = "CARD";

const DraggableCard = ({ id, index, moveCard, video }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index; // index of dragged item
      const hoverIndex = index; // index of hovered item
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect(); // ref element position and size in the viewport (top, right, btm, lft, w,  h)
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset(); // Mouses position relative to the viewport calculated in px
      const hoverClientY = clientOffset.y - hoverBoundingRect.top; // y-coordinate of mouse pointer relative to hovered item
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex; // Updates the index of the dragged item to the hovered index
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center mx-12 px-4 py-4 my-4 border-solid border-[1px] border-[rgba(255,_255,_255,_0.12)] bg-[#111111] rounded-xl ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-center">
        <span className="text-[#696969]">{video.id}</span>
        <div className="grid grid-cols-3 gap-44">
          <div className="flex w-[22rem] gap-4 ml-3 text-white col-span-2">
            <img
              src={video.photo}
              className="object-contain w-20 h-auto"
              alt={video.title}
            />
            <p className="font-thin text-white">{video.title}</p>
          </div>
          <div className="flex items-center justify-center col-span-1 text-center">
            <p className="text-[#DBFD51] font-thin align-center">
              {video.username}
            </p>
          </div>
        </div>
        <div className="absolute right-[5rem] flex items-center gap-1">
          <span className="font-thin text-white">{video.like}</span>
          <GoArrowUp className="text-[#9BFF00]" />
        </div>
      </div>
    </div>
  );
};

export default DraggableCard;
