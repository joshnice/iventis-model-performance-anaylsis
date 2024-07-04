import { ModelsListTemplate } from "./template/models-list";
import { RefreshMessage } from "./template/refresh-message";
import "./style.css";
import { sendMessage } from "./extension/messages";
import { PAGE_ALREADY_LOADED } from "./extension/message-constants";
import { isPageIventis } from "./api/url-helpers";
import { InvalidSite } from "./template/invalid-site";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
	throw new Error("Root of extension has not been found");
}

async function main() {
	const iventis = await isPageIventis();

	if (!iventis) {
		const invalidSiteMessage = new InvalidSite();
		invalidSiteMessage.showInvalidSiteMessage();
		return;
	}

	const isPageLoaded = await sendMessage(PAGE_ALREADY_LOADED);

	if (isPageLoaded) {
		const refreshMessage = new RefreshMessage();
		refreshMessage.showRefreshMessage();
		return;
	}

	new ModelsListTemplate();
}

window.onload = () => {
	main();
};
