import { useState } from "react";

const NewProjectModal = ({ onCreate, onCancel }: NewProjectModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className='p-6 w-full h-full flex flex-col justify-between'>
      <div className='text-lg font-semibold'>Create a new project</div>
      <div className='flex flex-col gap-4'>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Project name'
          className='px-2 py-1 border border-zinc-700 rounded'
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Project description'
          className='px-2 py-1 border border-zinc-700 rounded resize-none'
        />
      </div>
      <div className='flex items-center gap-4 ml-auto'>
        <button
          onClick={() => onCancel()}
          className='text-gray-400 font-semibold cursor-pointer'>
          Cancel
        </button>
        <button
          onClick={() => onCreate({ name, description })}
          className='bg-button-secondary hover:bg-button-secondary-hover px-6 py-1 rounded font-bold'>
          Create
        </button>
      </div>
    </div>
  );
};

export default NewProjectModal;

type NewProjectModalProps = {
  onCreate: (project: NewProjectInput) => void;
  onCancel: () => void;
};

export type NewProjectInput = {
  name: string;
  description: string;
};
