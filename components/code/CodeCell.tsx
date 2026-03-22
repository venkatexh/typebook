import { Editor } from "@monaco-editor/react";
import Preview from "./Preview";
import React from "react";

const CodeCell = React.memo(function CodeCell({
  content,
  onChange,
}: CodeCellProps) {
  return (
    <div>
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
      <div className='flex justify-center gap-4'>
        <button className='px-4 py-1 border rounded-3xl'>+ Code</button>
        <button className='px-4 py-1 border rounded-3xl'>+ Text</button>
      </div>
    </div>
  );
});

export default CodeCell;

type CodeCellProps = {
  content: string;
  onChange: (v: string | undefined) => void;
};
