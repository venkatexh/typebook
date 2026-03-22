import { useEffect, useRef } from "react";
import { startService } from "@/lib/esbuild";
import * as esbuild from "esbuild-wasm";
import fetchPkgPlugin from "@/lib/esbuild/plugins/fetchPkgPlugin";

function Preview({ code }: { code: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const bundleCode = async (input: string) => {
    await startService();

    const res = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [fetchPkgPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      format: "iife",
      globalName: "App",
    });

    return res.outputFiles[0].text;
  };

  const runCode = async (code: string) => {
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

    useEffect(() => {
      runCode(code);
    }, [code]);

  return <iframe ref={iframeRef} style={{ width: "100%", height: "300px" }} />;
}

export default Preview;