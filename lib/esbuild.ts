import * as esbuild from "esbuild-wasm";

// let initialized = false;

// export const startService = async () => {
//   if (initialized) return;

//   await esbuild.initialize({
//     worker: true,
//     wasmURL: "https://unpkg.com/esbuild-wasm@0.27.4/esbuild.wasm",
//   });

//   initialized = true;
// };

let initializing: Promise<void> | null = null;

export const startService = async () => {
  if (!initializing) {
    initializing = esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.27.4/esbuild.wasm",
    });
  }

  return initializing;
};
