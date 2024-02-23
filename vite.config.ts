// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import Pages from "vite-plugin-pages";
// import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
// import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: "/", // Adjust according to your deployment configuration
//   build: {
//     outDir: "public",
//     rollupOptions: {
//       external: ["@material-ui/icons/ArrowBack", "@mui/x-data-grid"],
//     },
//   },
//   plugins: [react(), Pages(), ] ,
//   // plugins: [react(), Pages(), CSS()],
// });
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Pages from "vite-plugin-pages";

export default defineConfig({
  base: "/", // Adjust according to your deployment configuration
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["@material-ui/icons/ArrowBack", "@mui/x-data-grid"],
    },
  },
  plugins: [react(), Pages()],
  // optimizeDeps: {
  //   exclude: ["react-select"],
  // },
});
