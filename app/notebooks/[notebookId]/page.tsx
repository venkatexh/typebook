"use client";

import { useCallback, useEffect, useState } from "react";
import { Cell } from "@/types/code/cell";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import CellComp from "@/components/code/CellComp";

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

  const moveCell = (fromIndex: number, toIndex: number) => {
    setCells((prevCells) => {
      if (
        fromIndex < 0 ||
        fromIndex >= prevCells.length ||
        toIndex < 0 ||
        toIndex >= prevCells.length ||
        fromIndex === toIndex
      ) {
        return prevCells; // do nothing if invalid
      }
      const updated = [...prevCells];
      const [movedCell] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedCell);
      return updated;
    });

    console.log(cells);
  };

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
      {cells.map((cell, index) => (
        <CellComp
          key={`cell-${cell.id}-pos -${index}`}
          idx={index}
          content={cell.content}
          onChange={(v) => updateCell(v || "", cell.id)}
          onAdd={(type) => insertCellAt(index + 1, type)}
          moveCell={(from: number, to: number) => {
            moveCell(from, to);
          }}
          onDelete={() => {
            setCells((prev) => prev.filter((c) => c.id !== cell.id));
          }}
          type={cell.type}
        />
      ))}
    </div>
  );
}
