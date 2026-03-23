import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import AddButtonsBlock from "./AddButtonsBlock";
import CellMenu from "./CellMenu";

function MarkdownCell({
  onAdd,
  content,
  idx,
  onChange,
  moveCell,
}: MarkdownCellProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showAddButtonsTop, setShowAddButtonsTop] = useState(false);
  const [showAddButtonsBottom, setShowAddButtonsBottom] = useState(false);

  return (
    <div
      className='relative'
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}>
      {idx == 0 && (
        <div
          onMouseEnter={() => setShowAddButtonsTop(true)}
          onMouseLeave={() => setShowAddButtonsTop(false)}
          className='h-4'>
          {showAddButtonsTop && <AddButtonsBlock onAdd={onAdd} pos='top' />}
        </div>
      )}
      {showMenu && (
        <CellMenu
          pos={idx == 0 ? "top" : "bottom"}
          handleClick={(action) => {
            if (action == "up") {
              moveCell(idx, idx - 1);
            } else if (action == "down") {
              moveCell(idx, idx + 1);
            }
          }}
        />
      )}
      <MDEditor value={content} onChange={(v) => onChange(v)} />
      <div
        onMouseEnter={() => setShowAddButtonsBottom(true)}
        onMouseLeave={() => setShowAddButtonsBottom(false)}
        className='h-4'>
        {showAddButtonsBottom && <AddButtonsBlock onAdd={onAdd} pos='bottom' />}
      </div>
    </div>
  );
}

export default MarkdownCell;

type MarkdownCellProps = {
  idx: number;
  onAdd: (type: "code" | "text") => void;
  content: string;
  onChange: (v: string | undefined) => void;
  moveCell: (from: number, to: number) => void;
};
