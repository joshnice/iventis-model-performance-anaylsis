import { get } from "../api/api-helpers";
import { getModelApiUrl, getModelsConfigApiUrl } from "../api/url-helpers";
import { onNetworkResponseCompleted } from "../extension/network";
import { BehaviorSubject } from "rxjs";
import type { ModelConfigResponse } from "../types/models-config";

let getModelsRequestResponse: chrome.webRequest.WebResponseCacheDetails;

export async function getModelsConfig(onModelLoaded: (modelName: string, modelId: string) => void) {
	const url = await getModelsConfigApiUrl();
	if (getModelsRequestResponse == null) {
		onNetworkResponseCompleted(url, async (getModelsRequestResponse) => {
			const modelsConfig = await get<ModelConfigResponse[]>(getModelsRequestResponse.url);
			for (const model of modelsConfig) {
				onModelLoaded(model.name, model.lods[0].files[0].assetId);
			}
		});
	}
}

export const $models = new BehaviorSubject<Record<string, string>>({});

export async function getModelListener() {
	const url = await getModelApiUrl();
	chrome.webRequest.onCompleted.addListener(
		(event) => {
			const modelUrl = event.url.split("?");
			const modelId = modelUrl[0].split("/").pop();
			if (modelId != null && event.url != null) {
				$models.next({ ...$models.value, [modelId]: event.url });
			}
		},
		{
			urls: [url],
		},
	);
}
