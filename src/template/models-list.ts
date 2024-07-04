import { getModelsConfig } from "../network-listeners/model-network-listeners";
import type { ModelConfig } from "../types/models-config";
import { ModelItem } from "./model-item";

export class ModelsListTemplate {
	private modelsConfig: ModelConfig[] = [];

	private container: HTMLDivElement | null = null;

	private appContainer: HTMLElement | null = null;

	constructor() {
		this.initialise();
	}

	private async initialise() {
		this.modelsConfig = await getModelsConfig();
		this.getApp();
		this.createContainer();
		this.createItems();
	}

	private getApp() {
		this.appContainer = document.getElementById("app");
	}

	private createContainer() {
		this.container = document.createElement("div");
		this.appContainer?.appendChild(this.container);
	}

	private createItems() {
		this.modelsConfig.forEach((modelConfig) => {
			if (this.container) {
				new ModelItem(modelConfig, this.container);
			}
		});
	}
}
