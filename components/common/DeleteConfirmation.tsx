const DeleteConfirmation = ({
  item,
  query,
  onCancel,
  onDelete,
}: DeleteConfirmationProps) => {
  return (
    <div className='w-full h-full p-6 flex flex-col justify-between'>
      <div className="text-xl font-bold">Delete {item}</div>
      <div className="text-lg">{query}</div>
      <div className='flex justify-end gap-4'>
        <button
          onClick={() => {
            onCancel();
          }}
          className='text-sm text-gray-400 cursor-pointer'>
          Cancel
        </button>
        <button
          onClick={() => {
            onDelete();
          }}
          className='px-4 py-0.5 text-sm border-2 border-red-500 text-red-500 rounded cursor-pointer'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

type DeleteConfirmationProps = {
  item: string;
  query: string;
  onCancel: () => void;
  onDelete: () => void;
};
