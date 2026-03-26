import React, { useState } from "react";
import AddButtonsBlock from "./AddButtonsBlock";
import CellMenu from "./CellMenu";
import Preview from "./Preview";
import MDEditor from "@uiw/react-md-editor";
import { Editor } from "@monaco-editor/react";
import { useModal } from "@/contexts/modal-context";
import DeleteConfirmation from "../common/DeleteConfirmation";

const CellComp = ({
  onAdd,
  idx,
  content,
  onChange,
  moveCell,
  onDelete,
  type,
}: CellProps) => {
  const { openConfirmationModal, closeConfirmationModal } = useModal();

  const [showMenu, setShowMenu] = useState(false);
  const [showAddButtonsTop, setShowAddButtonsTop] = useState(false);
  const [showAddButtonsBottom, setShowAddButtonsBottom] = useState(false);
  console.log("MOUNT");

  const handleDeleteClick = () => {
    openConfirmationModal(
      <DeleteConfirmation
        item='Cell'
        query='Are you sure you want to delete this cell?'
        onCancel={() => closeConfirmationModal()}
        onDelete={() => {
          onDelete();
          closeConfirmationModal();
        }}
      />,
    );
  };

  return (
    <div
      className='relative'
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}>
      {idx == 0 && (
        <div
          onMouseEnter={() => setShowAddButtonsTop(true)}
          onMouseLeave={() => setShowAddButtonsTop(false)}
          className='h-4'>
          {showAddButtonsTop && <AddButtonsBlock onAdd={onAdd} pos='top' />}
        </div>
      )}
      {showMenu && (
        <CellMenu
          pos={idx == 0 ? "top" : "bottom"}
          handleClick={(action) => {
            if (action == "up") {
              moveCell(idx, idx - 1);
            } else if (action == "down") {
              moveCell(idx, idx + 1);
            } else if (action == "delete") {
              handleDeleteClick();
            }
          }}
        />
      )}
      {type == "code" ? (
        <div className='flex rounded'>
          <Editor
            height='300px'
            defaultLanguage='javascript'
            defaultValue={content}
            onChange={(v) => onChange(v)}
            theme='vs-dark'
          />
          <Preview code={content} />
        </div>
      ) : (
        <MDEditor value={content} onChange={(v) => onChange(v)} />
      )}
      <div
        onMouseEnter={() => setShowAddButtonsBottom(true)}
        onMouseLeave={() => setShowAddButtonsBottom(false)}
        className='h-4'>
        {showAddButtonsBottom && <AddButtonsBlock onAdd={onAdd} pos='bottom' />}
      </div>
    </div>
  );
};

export default React.memo(CellComp);

type CellProps = {
  idx: number;
  type: "code" | "text";
  onAdd: (pos: "code" | "text") => void;
  content: string;
  moveCell: (from: number, to: number) => void;
  onChange: (v: string | undefined) => void;
  onDelete: () => void;
};
