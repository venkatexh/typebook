import Resizable from "@/components/common/Resizable";
import { Editor } from "@monaco-editor/react";
import Preview from "./Preview";

const CodeCellModalContent = ({ content, onChange }: CodeCellModalContent) => {
  return (
    <div className='w-full h-full flex'>
      <Resizable direction='horizontal'>
        <div className='relative h-full w-[calc(100%-10px)] rounded-l-2xl overflow-hidden'>
          <Editor
            height='100%'
            defaultLanguage='javascript'
            defaultValue={content}
            onChange={(v) => onChange(v)}
            theme='vs-dark'
            options={{}}
          />
        </div>
      </Resizable>
      <Preview
        code={content}
        showOpener={false}
        onChange={(v) => onChange(v)}
      />
    </div>
  );
};

export default CodeCellModalContent;

type CodeCellModalContent = {
  content: string;
  onChange: (v: string | undefined) => void;
};
