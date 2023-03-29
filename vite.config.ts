import { join, resolve } from "path";
import { globSync } from "glob";
import { defineConfig } from "vite";
import url from "@rollup/plugin-url";

const generateHtmlEntries = () => {
  const entries = {};
  globSync("**/*.html", { cwd: "src" }).forEach((file) => {
    if (!file.startsWith("/")) {
      const name = file.replace(/\.html$/, "");
      entries[name] = resolve(__dirname, "src", file);
    }
  });

  return entries;
};

const generateJsEntries = () => {
  const entries = {};
  globSync("**/*.js", { cwd: "src" }).forEach((file) => {
    const name = file.replace(/\.js$/, "");
    entries[name] = resolve(__dirname, "src", file);
  });

  return entries;
};

const entries = {
  ...generateJsEntries(),
  ...generateHtmlEntries()
};

export default defineConfig({
  root: join(__dirname, "src"),
  assetsInclude: ["**/*.mp4"],
  build: {
    assetsInlineLimit: 20000,
    outDir: join(__dirname, "dist"),
    emptyOutDir: true,
    minify: "esbuild",
    rollupOptions: {
      input: entries,
      plugins: [
        url({
          include: ["**/*.mp4", "**/*.webm"],
          limit: 0, // Set to 0 to disable inlining and force files to be emitted to the output directory
          emitFiles: true // Tell the plugin to emit the files to the output directory
        })
      ]
    }
  }
});
