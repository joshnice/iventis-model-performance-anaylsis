import type { ModelConfig } from "../types/models-config";

export class ModelItem {
	private readonly name: string;

	private readonly assetId: string;

	private readonly container: HTMLDivElement;

	constructor(modelConfig: ModelConfig, listContainer: HTMLDivElement) {
		this.name = modelConfig.name;
		this.assetId = modelConfig.assetId;
		this.container = listContainer;
		this.create();
	}

	private create() {
		const itemContainer = document.createElement("div");

		const name = document.createElement("p");
		name.innerText = this.name;

		const assetId = document.createElement("p");
		assetId.innerText = this.assetId;

		itemContainer.appendChild(name);
		itemContainer.appendChild(assetId);
		this.container.appendChild(itemContainer);
	}
}
