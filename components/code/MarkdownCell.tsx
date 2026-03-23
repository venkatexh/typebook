import MDEditor from "@uiw/react-md-editor";

function MarkdownCell({ content, onChange }: MarkdownCellProps) {
  return (
    <div>
      <MDEditor value={content} onChange={(v) => onChange(v)} />
    </div>
  );
}

export default MarkdownCell;

type MarkdownCellProps = {
  content: string;
  onChange: (v: string | undefined) => void;
};
