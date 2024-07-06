import { ModelsListTemplate } from "./template/models-list";
import { RefreshMessage } from "./template/refresh-message";
import { sendMessage } from "./extension/messages";
import { PAGE_ALREADY_LOADED } from "./extension/message-constants";
import { isPageIventis } from "./api/url-helpers";
import { InvalidSite } from "./template/invalid-site";
import type { TemplateBase } from "./template/template-base";
import { ModelViewer } from "./template/model-viewer";
import "./style.css";

let currentView: TemplateBase;

async function main() {
	const iventis = await isPageIventis();

	if (!iventis) {
		currentView = new InvalidSite();
		return;
	}

	const isPageLoaded = await sendMessage(PAGE_ALREADY_LOADED);

	if (isPageLoaded) {
		currentView = new RefreshMessage({ onRefreshClicked: showModelList });
		return;
	}

	currentView = new ModelsListTemplate({ onModelSelected: showModel });
}

function showModel(modelName: string, modelId: string) {
	currentView.remove();
	currentView = new ModelViewer(modelName, modelId, { onBackClicked: showModelList });
}

function showModelList() {
	currentView.remove();
	currentView = new ModelsListTemplate({ onModelSelected: showModel });
}

window.onload = () => {
	main();
};
