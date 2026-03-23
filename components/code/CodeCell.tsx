import { Editor } from "@monaco-editor/react";
import Preview from "./Preview";
import React, { useState } from "react";
import AddButtonsBlock from "./AddButtonsBlock";
import CellMenu from "./CellMenu";

const CodeCell = React.memo(function CodeCell({
  onAdd,
  idx,
  content,
  onChange,
  moveCell,
}: CodeCellProps) {
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
      <div className='flex rounded'>
        <Editor
          height='300px'
          defaultLanguage='javascript'
          defaultValue={content}
          onChange={(v) => onChange(v)}
          theme='vs-dark'
        />
        <Preview code={content} />
      </div>
      <div
        onMouseEnter={() => setShowAddButtonsBottom(true)}
        onMouseLeave={() => setShowAddButtonsBottom(false)}
        className='h-4'>
        {showAddButtonsBottom && <AddButtonsBlock onAdd={onAdd} pos='bottom' />}
      </div>
    </div>
  );
});

export default CodeCell;

type CodeCellProps = {
  idx: number;
  onAdd: (pos: "code" | "text") => void;
  content: string;
  moveCell: (from: number, to: number) => void;
  onChange: (v: string | undefined) => void;
};
