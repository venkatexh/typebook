"use client";

import { useCallback, useEffect, useState } from "react";
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
      {
        id: crypto.randomUUID(),
        type: "code",
        content: `const App = () => <h1>Hi there.</h1>`,
      },
      ...cells,
    ]);
  };

  const addMarkdownCell = () => {
    setCells([
      {
        id: crypto.randomUUID(),
        type: "text",
        content: "Text",
      },
      ...cells,
    ]);
  };

  const updateCell = useCallback((content: string, id: string) => {
    setCells((prevCells) =>
      prevCells.map((cell) => {
        if (cell.id === id) {
          return { ...cell, content };
        }
        return cell;
      }),
    );
  }, []);

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
        {cells.map((cell) =>
          cell.type === "code" ? (
            <CodeCell
              key={cell.id}
              content={cell.content}
              onChange={(v) => updateCell(v || "", cell.id)}
            />
          ) : (
            <MarkdownCell
              key={cell.id}
              content={cell.content}
              onChange={(v) => updateCell(v || "", cell.id)}
            />
          ),
        )}
      </div>
    </div>
  );
}
