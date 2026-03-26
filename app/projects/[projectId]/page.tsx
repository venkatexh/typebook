"use client";

import moment from "moment";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    const fetchNotebooks = async () => {
      const { data, error } = await supabase
        .from("notebooks")
        .select("id, title, description, createdAt:created_at");
      if (error) {
        console.log(error);
      }
      if (data) {
        setNotebooks(data);
      }
    };

    fetchNotebooks();
  }, []);

  return (
    <div className='p-12'>
      <div className='text-2xl font-semibold'>Notebooks</div>
      <div className='py-6 flex flex-wrap gap-4 '>
        {notebooks.map((notebook) => (
          <Link href={`/notebooks/${notebook.id}`} key={notebook.id}>
            <div key={notebook.id} className='w-80 p-4 bg-slate-900 rounded'>
              <div className=''>
                <div className='text-xl'>{notebook.title}</div>
              </div>
              <div className='py-2 text-sm text-gray-300'>
                {notebook.description}
              </div>
              <div className='text-xs text-right text-gray-300'>
                Created {moment(notebook.createdAt).fromNow()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

type Notebook = {
  id: string;
  title: string;
  createdAt: Date;
  description: string;
};
