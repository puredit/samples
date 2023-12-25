import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    target: ["chrome89", "edge89", "firefox89", "safari15.1"]
  },
  plugins: [
    svelte(),
    viteStaticCopy({
      targets: [
        {
          src: "../../node_modules/@puredit/parser/wasm/tree-sitter.wasm",
          dest: command === "build" ? "wasm" : "node_modules/.vite/deps/wasm"
        },
        {
          src: "../../node_modules/@puredit/parser/wasm/tree-sitter-typescript.wasm",
          dest: command === "build" ? "wasm" : "node_modules/.vite/deps/wasm"
        },
        {
          src: "../../node_modules/@puredit/parser/wasm/tree-sitter-python.wasm",
          dest: command === "build" ? "wasm" : "node_modules/.vite/deps/wasm"
        }
      ]
    })
  ],
  resolve: {
    alias: {
      crypto: "node:crypto",
    },
  },
}));
