import { GET_MODEL } from "../api/url-contstant";
import type { ModelConfig } from "../types/models-config";
import { ModelItem } from "./model-item";
import { ModelViewer } from "./model-viewer";

export class ModelsListTemplate {
	private readonly modelsConfig: ModelConfig[] = [];

	private container: HTMLDivElement | null = null;

	private appContainer: HTMLElement | null = null;

	constructor(modelsConfig: ModelConfig[]) {
		this.modelsConfig = modelsConfig;
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

		if (this.container) {
			new ModelViewer(this.container, GET_MODEL);
		}
	}
}
