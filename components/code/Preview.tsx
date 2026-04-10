import { useEffect, useRef, useState } from "react";
import { startService } from "@/lib/esbuild";
import * as esbuild from "esbuild-wasm";
import fetchPkgPlugin from "@/lib/esbuild/plugins/fetchPkgPlugin";
import { useModal } from "@/contexts/modal-context";
import CodeCellModalContent from "./CodeCellModalContent";
import { IoMdOpen } from "react-icons/io";

function Preview({ code, onChange, showOpener, pointerNone }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { openCodeCellModal } = useModal();

  const [showOpenerIcon, setShowOpenerIcon] = useState(false);

  const wrapCode = (code: string) => {
    return `
    const React = window.React;
    const { useState, useEffect } = React;

    ${code}
  `;
  };

  useEffect(() => {
    const run = async () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      await startService();

      const result = await esbuild.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [fetchPkgPlugin(wrapCode(code))],
        define: {
          "process.env.NODE_ENV": '"production"',
          global: "window",
        },
        format: "iife",
        globalName: "App",
        external: ["react", "react-dom"],
        inject: []
      });

      const bundled = result.outputFiles[0].text;

      const html = `
          <html style="height: 100%;">
            <body style="color: #ffffff; height: 100%;">
              <div id="root" style="height: 100%;"></div>

              <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

              <script>
                window.React = React;
                window.ReactDOM = ReactDOM;
              </script>
              <script>
                try {
                  ${bundled}

                  const Component = App?.default;

                  if (Component) {
                  const root = document.getElementById("root");
                    ReactDOM.createRoot(root).render(React.createElement(Component));
                  }
                } catch (err) {
                  document.body.innerHTML =
                    '<pre style="color:red;">' + err + '</pre>';
                }
              </script>
            </body>
          </html>
        `;

      iframe.srcdoc = html;
    };

    const timer = setTimeout(run, 500); // debounce
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div
      className='relative grow'
      onMouseEnter={() => setShowOpenerIcon((prev) => !prev)}
      onMouseLeave={() => setShowOpenerIcon((prev) => !prev)}>
      {showOpener && showOpenerIcon && (
        <div
          onClick={() =>
            openCodeCellModal(
              <CodeCellModalContent
                content={code}
                onChange={(v) => onChange(v)}
              />,
            )
          }
          className='absolute -top-2 right-0 z-30'>
          <IoMdOpen />
        </div>
      )}

      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: showOpener ? "300px" : "100%",
          pointerEvents: pointerNone ? "none" : "all",
        }}
        sandbox='allow-scripts'
      />
    </div>
  );
}

export default Preview;

type PreviewProps = {
  code: string;
  onChange: (v: string | undefined) => void;
  showOpener: boolean;
  pointerNone?: boolean;
};
