import { Editor } from "@monaco-editor/react";
import Preview from "./Preview";
import React, { useState } from "react";
import AddButtonsBlock from "./AddButtonsBlock";

const CodeCell = React.memo(function CodeCell({
  onAdd,
  idx,
  content,
  onChange,
}: CodeCellProps) {
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
  onChange: (v: string | undefined) => void;
};
