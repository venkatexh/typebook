"use client";

import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";

export default function CodePage() {
  const [code, setCode] = useState(`
    exports.default = function App() {
  return React.createElement("h1", null, "Hello world");
};
  `);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    const html = `
      <html>
        <body>
          <div id="root"></div>
          
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

          <script>
            window.onload = function () {
        try {
          const exports = {};
          ${code}

          const App = exports.default;

          ReactDOM.createRoot(document.getElementById("root")).render(
            React.createElement(App)
          );
        } catch (err) {
          document.body.innerHTML = '<pre style="color:red;">' + err + '</pre>';
        }
      };
          </script>
        </body>
      </html>
    `;

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
