import { Cell } from "@/types/code/cell";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownCell({ cell }: { cell: Cell }) {
  const [text, setText] = useState(cell.content);

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />

      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default MarkdownCell;
