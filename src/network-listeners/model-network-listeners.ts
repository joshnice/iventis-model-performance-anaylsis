import { get } from "../api/api-helpers";
import { getModelApiUrl, getModelsConfigApiUrl } from "../api/url-helpers";
import { onNetworkResponseCompleted } from "../extension/network";
import type { ModelConfig, ModelConfigResponse } from "../types/models-config";

let getModelsRequestResponse: chrome.webRequest.WebResponseCacheDetails;

export async function getModelsConfig(): Promise<ModelConfig[]> {
	const url = await getModelsConfigApiUrl();
	if (getModelsRequestResponse == null) {
		getModelsRequestResponse = await onNetworkResponseCompleted(url);
	}
	const modelsConfig = await get<ModelConfigResponse[]>(getModelsRequestResponse.url);

	return modelsConfig.map((modelConfig) => ({
		assetId: modelConfig.lods[0].files[0].assetId,
		name: modelConfig.name,
	}));
}

export const modelIdWithUrl: Record<string, string> = {};

export async function getModelListener() {
	const url = await getModelApiUrl();
	chrome.webRequest.onCompleted.addListener(
		(event) => {
			const modelUrl = event.url.split("?");
			const modelId = modelUrl[0].split("/").pop();
			if (modelId != null && event.url != null) {
				modelIdWithUrl[modelId] = event.url;
			}
		},
		{
			urls: [url],
		},
	);
}
