import { useEffect, useRef } from "react";
import { startService } from "@/lib/esbuild";
import * as esbuild from "esbuild-wasm";
import fetchPkgPlugin from "@/lib/esbuild/plugins/fetchPkgPlugin";

function Preview({ code }: { code: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const wrapCode = (code: string) => {
    if (code.includes("export default")) return code;

    return `
    ${code}

    let __Component = null;
    
    if (typeof App === "function") {
      __Component = App;
    } else if (typeof App === "function") {
      __Component = App;
    }

    export default __Component;
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
      });

      const bundled = result.outputFiles[0].text;

      const html = `
          <html>
            <body style="color: #ffffff;">
              <div id="root"></div>

              <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

              <script>
                try {
                  ${bundled}

                  const Component = App?.default;

                  if (Component) {
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
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "300px" }}
      sandbox='allow-scripts'
    />
  );
}

export default Preview;
