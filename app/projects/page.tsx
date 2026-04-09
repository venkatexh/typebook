"use client";

import moment from "moment";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useModal } from "@/contexts/modal-context";

import NewProjectModal, {
  NewProjectInput,
} from "@/components/projects/NewProjectModal";

export default function ProjectsPage() {
  const { openModal, closeModal } = useModal();
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

  const handleCreateProject = async (project: NewProjectInput) => {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        name: project.name,
        description: project.description,
      })

      .select("id, name, description, createdAt:created_at")
      .single();
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      setProjects((prev) => [...prev, data]);
      closeModal();
    }
  };

  return (
    <div className='p-12'>
      <div className='flex justify-between items-center'>
        <div className='text-3xl font-semibold'>Projects</div>
        <button
          onClick={() => {
            openModal(
              <NewProjectModal
                onCancel={() => closeModal()}
                onCreate={(project) => handleCreateProject(project)}
              />,
            );
          }}
          className='bg-button-primary hover:bg-button-primary-hover px-6 py-1 rounded font-bold'>
          New
        </button>
      </div>
      <div className='py-6 flex flex-wrap gap-4'>
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
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
          </Link>
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
