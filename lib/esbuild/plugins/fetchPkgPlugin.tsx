/* eslint-disable @typescript-eslint/no-explicit-any */
const fetchPkgPlugin = (input: string) => ({
  name: "fetch-pkg",
  setup(build: any) {
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
          path: `https://esm.sh/${args.path}?bundle&dev`,
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
      console.log("FETCHING:", args.path);
      const res = await fetch(args.path);
      const finalURL = res.url;
      const text = await res.text();

      return {
        loader: "jsx",
        contents: text,
        resolveDir: new URL("./", finalURL).pathname,
      };
    });
  },
});

export default fetchPkgPlugin;
