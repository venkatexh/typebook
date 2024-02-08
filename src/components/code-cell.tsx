import CodeEditor from "./code-editor";
import bundle from "../bundler";
import Preview from "./preview";
import { useState, useEffect } from "react";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  const showFunction = `
  import _React from 'react'
  import * as _ReactDOM from 'react-dom/client'

  var show = (value) => {
    const root = _ReactDOM.createRoot(document.querySelector('#root'))

    if (typeof value === 'object') {
      if (value.$$typeof && value.props) {
        root.render(value, root);
      } else {
        document.querySelector('#root').innerHTML = JSON.stringify(value);
      }
    } else {
      document.querySelector('#root').innerHTML = value;
    }
  }
  `;

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(`${showFunction}\n${cell.content}`);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, showFunction]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} error={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
