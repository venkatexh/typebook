import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import Preview from "./Preview";
import { Cell } from "@/types/code/cell";

function CodeCell({ cell }: { cell: Cell }) {
  const [code, setCode] = useState(cell.content);

  return (
    <div className='flex rounded'>
      <Editor
        height='300px'
        defaultLanguage='javascript'
        value={code}
        onChange={(v) => setCode(v || "")}
        theme='vs-dark'
      />
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
