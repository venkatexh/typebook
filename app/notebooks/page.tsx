"use client";

import { Cell } from "@/types/code/cell";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotebooksPage() {
  const router = useRouter();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    const fetchNotebooks = async () => {
      const { data, error } = await supabase.from("notebooks").select("*");
      if (error) {
        console.log(error);
      }
      if (data) {
        setNotebooks(data);
      }
    };
    fetchNotebooks();
  }, []);

  const createNewNotebook = async () => {
    const { data, error } = await supabase
      .from("notebooks")
      .insert([
        {
          title: "Untitled",
          cells: [],
        },
      ])
      .select("id")
      .single();
    if (error) {
      console.log(error);
    }
    if (data) {
      router.push(`/notebooks/${data.id}`);
    }
  };

  return (
    <div className='p-12'>
      <div className='flex justify-between'>
        <div>Notebooks</div>
        <button onClick={() => createNewNotebook()}>New</button>
      </div>
      <div className='py-12 flex flex-wrap gap-4'>
        {notebooks.map((notebook) => {
          return (
            <Link key={notebook.id} href={`/notebooks/${notebook.id}`}>
              <div key={notebook.id} className='px-2 w-75 h-40 border'>
                <h1>{notebook.title}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type Notebook = {
  id: string;
  title: string;
  cells: Cell[];
  createdAt: Date;
  createdBy: string;
};
