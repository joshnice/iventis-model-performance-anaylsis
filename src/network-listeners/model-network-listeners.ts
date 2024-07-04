import { get } from "../api/api-helpers";
import { GET_MODELS } from "../api/url-contstant";
import { onNetworkResponseCompleted } from "../extension/network";
import type { ModelConfig, ModelConfigResponse } from "../types/models-config";

export async function getModelsConfig(): Promise<ModelConfig[]> {
	const getModelsRequest = await onNetworkResponseCompleted(GET_MODELS);

	const modelsConfig = await get<ModelConfigResponse[]>(getModelsRequest.url);

	return modelsConfig.map((modelConfig) => ({
		assetId: modelConfig.lods[0].files[0].assetId,
		name: modelConfig.name,
	}));
}
