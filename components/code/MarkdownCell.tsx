import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import AddButtonsBlock from "./AddButtonsBlock";

function MarkdownCell({ onAdd, content, idx, onChange }: MarkdownCellProps) {
  const [showAddButtonsTop, setShowAddButtonsTop] = useState(false);
  const [showAddButtonsBottom, setShowAddButtonsBottom] = useState(false);

  return (
    <div className='relative'>
      {idx == 0 && (
        <div
          onMouseEnter={() => setShowAddButtonsTop(true)}
          onMouseLeave={() => setShowAddButtonsTop(false)}
          className='h-4'>
          {showAddButtonsTop && <AddButtonsBlock onAdd={onAdd} pos='top' />}
        </div>
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
};
