import { getModelsConfig } from "../network-listeners/model-network-listeners";
import { TemplateBase } from "./template-base";
import { ModelItem } from "./model-item";
import type { ModelConfig } from "../types/models-config";
import "./models-list.css";

export class ModelsListTemplate extends TemplateBase {

	private container: HTMLDivElement | null = null;

	private modelsConfig: ModelConfig[] = [];

	private readonly events: { onModelSelected: (modelName: string, modelId: string) => void };

	constructor(events: { onModelSelected: (modelName: string, modelId: string) => void }) {
		super("model-list");
		this.events = events;
		this.add();
	}

	public async add() {
		this.createContainer();
		this.createItems();
	}

	private createContainer() {
		this.container = document.createElement("div");
		this.container.id = this.elementId;
		this.appContainer.appendChild(this.container);
	}

	private async createItems() {
		this.modelsConfig = await getModelsConfig();
		this.modelsConfig.forEach((modelConfig) => {
			if (this.container) {
				new ModelItem(modelConfig, this.container, this.events);
			}
		});
	}
}
