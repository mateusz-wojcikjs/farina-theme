// vite.config.js
import { join, resolve } from "path";
import { globSync } from "glob";
import { defineConfig } from "vite";

const generateHtmlEntries = () => {
  const entries = {};
  globSync("**/*.html", { cwd: "src" }).forEach((file) => {
    const name = file.replace(/\.html$/, "");
    entries[name] = resolve(__dirname, "src", file);
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
  build: {
    outDir: join(__dirname, "dist"),
    emptyOutDir: true,
    minify: "esbuild",
    rollupOptions: {
      input: entries,
      plugins: []
    }
  },
  optimizeDeps: {
    include: ["@wordpress/scripts"]
  }
});
