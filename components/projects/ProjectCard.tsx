import { Project } from "@/app/projects/page";
import moment from "moment";
import Link from "next/link";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link key={project.id} href={`/projects/${project.id}`}>
      <div key={project.id} className='w-90 bg-slate-900 p-4 rounded-xl'>
        <div className='flex justify-start items-center gap-2'>
          <div className='w-8 h-8 bg-amber-500  flex justify-center items-center rounded-full'>
            {project.name.slice(0, 1).toUpperCase()}
          </div>
          <div>{project.name}</div>
        </div>
        <div className='py-4 text-sm text-gray-300'>{project.description}</div>
        <div className='text-xs text-right'>
          {moment(project.createdAt).format("MMM YYYY")}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
