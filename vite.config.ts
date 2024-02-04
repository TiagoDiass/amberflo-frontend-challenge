import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsConfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./.vitest/vitest-setup.ts",
		coverage: {
			provider: "v8",
			exclude: [],
		},
	},
});
