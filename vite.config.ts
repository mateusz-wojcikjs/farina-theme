// vite.config.js
import { resolve, join } from 'path'
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
import { defineConfig } from 'vite'

const generateHtmlEntries = () => {
    const entries = {};
    globSync("**/*.html", {cwd: 'src'}).forEach(file => {
        const name = file.replace(/\.html$/, '');
        entries[name] = resolve(__dirname, 'src', file);
    });

    return entries;
}

export default defineConfig({
    root: join(__dirname, "src"),
    build: {
        outDir: join(__dirname, "dist"),
        emptyOutDir: true,
        minify: 'esbuild',
        rollupOptions: {
            input: generateHtmlEntries(),
        },
    },
    optimizeDeps: {
        include: ["@wordpress/scripts"]
    }
})