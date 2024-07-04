import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				app: "./index.html",
				"content-script": "./src/content-scripts/content-scripts.ts",
			},
			output: {
				entryFileNames: (assetInfo) => {
					return assetInfo.name === "content-script" ? "[name].js" : "assets/js/[name]-[hash].js";
				},
			},
		},
	},
});
