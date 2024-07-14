export interface ModelConfig {
	name: string;
	assetId: string;
}

export interface ModelConfigResponse {
	name: string;
	lods: [
		{
			files: [
				{
					assetId: string;
				},
			];
		},
	];
}
