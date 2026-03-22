"use client";

import { startService } from "@/lib/esbuild";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

export default function CodePage() {
  const [code, setCode] = useState(`
    export default function App() {
  return <h1>JSX is working 🎉</h1>;
}
  `);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const bundleCode = async (input: string) => {
    await startService();

    const res = await esbuild.transform(input, {
      loader: "jsx",
      target: "es2015",
      format: "iife",
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
      globalName: "App",
    });

    return res.code;
  };

  const runCode = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const bundled = await bundleCode(code);

    const html = `
      <html>
        <body>
          <div id="root"></div>
          
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

          <script>
        try {
          ${bundled}

          ReactDOM.createRoot(document.getElementById("root")).render(
            React.createElement(App.default)
          );

        } catch (err) {
          document.body.innerHTML = '<pre style="color:red;">' + err + '</pre>';
        }
          </script>
        </body>
      </html>
    `;

    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(html);
    doc.close();
  };

  return (
    <div>
      <h2>Editor</h2>
      <Editor
        height='400px'
        defaultLanguage='javascript'
        value={code}
        theme='vs-dark'
        onChange={(value) => setCode(value || "")}
      />
      <button onClick={runCode}>Run</button>
      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
