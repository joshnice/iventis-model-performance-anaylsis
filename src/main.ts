import { getModelsConfig } from "./network-listeners/model-network-listeners";
import { ModelsListTemplate } from "./template/models-list";
import { RefreshMessage } from "./template/refresh-message";
import "./style.css";
import { sendMessage } from "./extension/messages";
import { PAGE_ALREADY_LOADED } from "./extension/message-constants";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
	throw new Error("Root of extension has not been found");
}

async function main() {
	sendMessage({ id: PAGE_ALREADY_LOADED, callback: refreshMessage });

	await getModels();
}

function refreshMessage(showMessage: boolean) {
	if (showMessage) {
		const refreshMessage = new RefreshMessage();
		refreshMessage.showRefreshMessage();
	}
}

async function getModels() {
	const modelsConfig = await getModelsConfig();
	new ModelsListTemplate(modelsConfig);
}

window.onload = () => {
	main();
};
