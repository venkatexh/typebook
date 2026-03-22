"use client";

import { useEffect, useState } from "react";
import CodeCell from "@/components/code/CodeCell";
import { Cell } from "@/types/code/cell";
import MarkdownCell from "@/components/code/MarkdownCell";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function CodePage() {
  const params = useParams();
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

  const saveNotebook = async (cells: Cell[]) => {
    const { data, error } = await supabase
      .from("notebooks")
      .update([
        {
          title: "Untitled",
          cells,
        },
      ])
      .eq("id", params.notebookId);

    if (error) {
      console.log(error);
    }

    return data;
  };

  const loadNotebook = async (id: string) => {
    const { data, error } = await supabase
      .from("notebooks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const notebook = await loadNotebook(params.notebookId as string);
      if (notebook) {
        setCells(notebook.cells);
      }
    };

    fetchData();
  }, [params.notebookId]);

  return (
    <div className='w-full flex flex-col p-4'>
      <div>
        <button
          onClick={() => saveNotebook(cells)}
          className='px-4 py-1 bg-cyan-900'>
          Save
        </button>
      </div>
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
            <CellRenderer cell={cell} />
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
