import { getModelsConfig } from "./network-listeners/model-network-listeners";
import { ModelsListTemplate } from "./template/models-list";
import { getCurrentTab } from "./extension/tabs";
import { RefreshMessage } from "./template/refresh-message";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
	throw new Error("Root of extension has not been found");
}

async function main() {
	const tab = await getCurrentTab();

	const help = new RefreshMessage();

	if (tab.id == null) {
		throw new Error("Tab id is null");
	}

	chrome.tabs.sendMessage(tab.id, "is-page-loaded", (response) => {
		if (response) {
			help.showRefreshMessage();
		}
	});

	await getModels();
}

async function getModels() {
	const modelsConfig = await getModelsConfig();
	new ModelsListTemplate(modelsConfig);
}

window.onload = () => {
	main();
};
