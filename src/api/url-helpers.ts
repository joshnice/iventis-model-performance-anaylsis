import { getCurrentTab } from "../extension/tabs";
import { APPLICATION_URLS, DEV_URL, GET_MODELS_CONFIG, GET_MODEL_APP, GET_MODEL_DEV, MAP_URL } from "./urls-constants";

export async function isPageIventis() {
	const tab = await getCurrentTab();
	return tab.url != null && APPLICATION_URLS.some((url) => tab.url?.includes(url));
}

export async function isIvenitsPageMap() {
	const tab = await getCurrentTab();
	return tab.url?.includes(MAP_URL);
}

export async function getApiUrl() {
	const tab = await getCurrentTab();

	if (tab.url == null) {
		throw new Error("Tab url is null");
	}

	const spiltUrl = tab.url.split("spatial-planner");
	return `${spiltUrl[0]}api/`;
}

export async function getModelsConfigApiUrl() {
	const apiUrl = await getApiUrl();
	return `${apiUrl}${GET_MODELS_CONFIG}`;
}

export async function getModelApiUrl() {
	const tab = await getCurrentTab();
	const isDev = tab.url?.includes(DEV_URL);
	return isDev ? GET_MODEL_DEV : GET_MODEL_APP;
}
