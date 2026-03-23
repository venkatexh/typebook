import { HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

const CellMenu = ({ pos, handleClick }: CellMenuProps) => {
  return (
    <div
      className={`absolute ${pos == "top" ? "top-0" : "-top-4"} -top-4 right-32 px-2 py-1 flex bg-slate-900 rounded z-100`}>
      <HiOutlineArrowUp
        className='w-6 h-6 py-1 rounded hover:bg-slate-800'
        onClick={() => handleClick("up")}
      />
      <HiOutlineArrowDown
        className='w-6 h-6 py-1 rounded hover:bg-slate-800'
        onClick={() => handleClick("down")}
      />
      <RiDeleteBinLine
        className='w-6 h-6 py-1 rounded hover:bg-slate-800'
        onClick={() => handleClick("delete")}
      />
    </div>
  );
};

export default CellMenu;

export type CellMenuProps = {
  pos: "top" | "bottom";
  handleClick: (type: "up" | "down" | "delete") => void;
};
