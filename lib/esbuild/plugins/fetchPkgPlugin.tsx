/* eslint-disable @typescript-eslint/no-explicit-any */

const fileCache: Record<string, any> = {};
const fetchPkgPlugin = (input: string) => ({
  name: "fetch-pkg",
  setup(build: any) {

    build.onResolve({ filter: /^react$/ }, () => {
      return { path: "react", external: true };
    });

    build.onResolve({ filter: /^react-dom$/ }, () => {
      return { path: "react-dom", external: true };
    });

    build.onResolve({ filter: /^react-dom\/client$/ }, () => {
      return { path: "react-dom/client", external: true };
    });

    build.onResolve(
      {
        filter: /^index\.js$/,
      },
      () => {
        return {
          path: "index.js",
          namespace: "a",
        };
      },
    );

    build.onResolve(
      {
        filter: /.\.+\//,
      },
      (args: any) => {
        return {
          path: new URL(args.path, args.importer).href,
          namespace: "a",
        };
      },
    );

    build.onResolve(
      {
        filter: /.*/,
      },
      (args: any) => {
        if (!args.path) return null;

        if (args.path === "index.js") {
          return { path: "index.js", namespace: "a" };
        }

        if (args.path.startsWith("/")) {
          return {
            path: `https://esm.sh${args.path}`, // ← no double slash issue
            namespace: "a",
          };
        }

        if (args.path.startsWith("./") || args.path.startsWith("../")) {
          return {
            path: new URL(args.path, args.importer).href,
            namespace: "a",
          };
        }

        return {
          path: `https://esm.sh/${args.path}`,
          namespace: "a",
        };
      },
    );

    build.onLoad(
      {
        filter: /^index\.js$/,
        namespace: "a",
      },
      () => {
        return {
          loader: "jsx",
          contents: input,
        };
      },
    );

    build.onLoad({ filter: /.*/, namespace: "a" }, async (args: any) => {
      if (fileCache[args.path]) {
        return fileCache[args.path];
      }
      const res = await fetch(args.path);
      const finalURL = res.url;
      const text = await res.text();

      const result = {
        loader: "js",
        contents: text,
        resolveDir: new URL("./", finalURL).pathname,
      };

      fileCache[args.path] = result;

      return result;
    });
  },
});

export default fetchPkgPlugin;
