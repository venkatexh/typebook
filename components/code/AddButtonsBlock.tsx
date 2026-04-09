export const AddButtonsBlock = ({ onAdd, pos }: AddButtonsBlockProps) => {
  return (
    <div
      className={`absolute w-auto ${pos == "top" ? "top-0" : "bottom-0"}
    left-0 right-0 mx-auto flex justify-center gap-4 text-xs font-bold z-100`}>
      <button
        className='px-4 py-1 bg-slate-900 hover:bg-white hover:text-gray-800 border rounded-3xl'
        onClick={() => onAdd("code", pos)}>
        + Code
      </button>
      <button
        className='px-4 py-1 bg-slate-900 hover:bg-white hover:text-gray-800 border rounded-3xl'
        onClick={() => onAdd("text", pos)}>
        + Text
      </button>
    </div>
  );
};

export default AddButtonsBlock;

type AddButtonsBlockProps = {
  onAdd: (type: "code" | "text", pos: "top" | "bottom") => void;
  pos: "top" | "bottom";
};
