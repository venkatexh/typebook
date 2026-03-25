"use client";

import moment from "moment";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("projects").select(`
        id, name, description, createdAt:created_at`);
      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setProjects(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-12'>
      <div className='text-3xl '>Projects</div>
      <div className='py-6 flex flex-wrap gap-4'>
        {projects.map((project) => (
          <div key={project.id} className='bg-slate-900 p-4 rounded-xl'>
            <div className='flex justify-start items-center gap-2'>
              <div className='w-8 h-8 bg-amber-500  flex justify-center items-center rounded-full'>
                {project.name.slice(0, 1).toUpperCase()}
              </div>
              <div>{project.name}</div>
            </div>
            <div className='py-4 text-sm text-gray-300'>
              {project.description}
            </div>
            <div className='text-xs text-right'>
              {moment(project.createdAt).format("MMM YYYY")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  type Project = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
  };
}
