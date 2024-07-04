import { get } from "../api/api-helpers";
import { getModelsConfigApiUrl } from "../api/url-helpers";
import { onNetworkResponseCompleted } from "../extension/network";
import type { ModelConfig, ModelConfigResponse } from "../types/models-config";

export async function getModelsConfig(): Promise<ModelConfig[]> {
	const url = await getModelsConfigApiUrl();
	const getModelsRequest = await onNetworkResponseCompleted(url);
	const modelsConfig = await get<ModelConfigResponse[]>(getModelsRequest.url);

	return modelsConfig.map((modelConfig) => ({
		assetId: modelConfig.lods[0].files[0].assetId,
		name: modelConfig.name,
	}));
}
