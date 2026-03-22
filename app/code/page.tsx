"use client";

import { useState } from "react";
import CodeCell from "@/components/code/CodeCell";
import { Cell } from "@/types/code/cell";
import MarkdownCell from "@/components/code/MarkdownCell";

export default function CodePage() {
  const [cells, setCells] = useState<Cell[]>([]);

  const addCodeCell = () => {
    setCells([
      ...cells,
      {
        id: crypto.randomUUID(),
        type: "code",
        content: `
    export default function App() {
  return <h1>JSX is working 🎉</h1>;
}
  `,
      },
    ]);
  };

  const addMarkdownCell = () => {
    setCells([
      ...cells,
      {
        id: crypto.randomUUID(),
        type: "text",
        content: "Text",
      },
    ]);
  };

  function CellRenderer({ cell }: { cell: Cell }) {
    if (cell.type === "code") {
      return <CodeCell cell={cell} />;
    }
    return <MarkdownCell cell={cell} />;
  }

  return (
    <div className='w-full flex flex-col p-4'>
      <div className='flex justify-center gap-4'>
        <button onClick={addCodeCell} className='px-4 py-1 border rounded-3xl'>
          + Code
        </button>
        <button
          onClick={addMarkdownCell}
          className='px-4 py-1 border rounded-3xl'>
          + Text
        </button>
      </div>
      <div>
        {cells.map((cell) => (
          <div key={cell.id}>
            <CellRenderer key={cell.id} cell={cell} />
            <div className='flex justify-center gap-4'>
              <button
                onClick={addCodeCell}
                className='px-4 py-1 border rounded-3xl'>
                + Code
              </button>
              <button
                onClick={addMarkdownCell}
                className='px-4 py-1 border rounded-3xl'>
                + Text
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
