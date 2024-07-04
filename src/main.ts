import { getModelsConfig } from "./network-listeners/model-network-listeners";
import { ModelsListTemplate } from "./template/models-list";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
	throw new Error("Root of extension has not been found");
}

async function main() {
	getModels();
}

async function getModels() {
	const modelsConfig = await getModelsConfig();
	new ModelsListTemplate(modelsConfig);
}

main();
