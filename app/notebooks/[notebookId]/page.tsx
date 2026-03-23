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

  const insertCellAt = (index: number, type: "code" | "text") => {
    const newCell = {
      id: crypto.randomUUID(),
      type,
      content: "",
    };

    setCells((prev) => [
      ...prev.slice(0, index),
      newCell,
      ...prev.slice(index),
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
      <div>
        {cells.map((cell, index) =>
          cell.type === "code" ? (
            <CodeCell
              idx={index}
              key={cell.id}
              content={cell.content}
              onChange={(v) => updateCell(v || "", cell.id)}
              onAdd={(type) => insertCellAt(index + 1, type)}
            />
          ) : (
            <MarkdownCell
              idx={index}
              key={cell.id}
              content={cell.content}
              onChange={(v) => updateCell(v || "", cell.id)}
              onAdd={(type) => insertCellAt(index + 1, type)}
            />
          ),
        )}
      </div>
    </div>
  );
}
