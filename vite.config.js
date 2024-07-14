import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				app: "./index.html",
				"content-script": "./src/content-script/content-script.ts",
			},
			output: {
				entryFileNames: (assetInfo) => {
					const { name } = assetInfo;
					switch (name) {
						case "content-script":
							return "[name].js";
						default:
							return "assets/js/[name]-[hash].js";
					}
				},
			},
		},
	},
});
