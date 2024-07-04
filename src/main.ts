import { getModelsConfig } from "./network-listeners/model-network-listeners";
import { ModelsListTemplate } from "./template/models-list";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
	throw new Error("#app not found");
}

app.innerHTML = `
  <div id="content">
    hello world
  </div>
`;

async function main() {
	getModels();
}

async function getModels() {
	const modelsConfig = await getModelsConfig();
	new ModelsListTemplate(modelsConfig);
}

main();
