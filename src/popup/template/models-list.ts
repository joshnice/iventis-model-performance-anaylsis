import { getModelsConfig } from "../network-listeners/model-network-listeners";
import { TemplateBase } from "./template-base";
import { ModelItem } from "./model-item";
import "./models-list.css";

export class ModelsListTemplate extends TemplateBase {
	private container: HTMLDivElement | null = null;

	private models: { modelName: string; modelId: string }[];

	private readonly events: {
		onModelSelected: (modelName: string, modelId: string) => void;
		onModelLoaded: (modelName: string, modelId: string) => void;
	};

	constructor(
		events: {
			onModelSelected: (modelName: string, modelId: string) => void;
			onModelLoaded: (modelName: string, modelId: string) => void;
		},
		loadedModels: { modelName: string; modelId: string }[],
	) {
		super("model-list");
		this.events = events;
		this.models = loadedModels;
		this.add();
	}

	public async add() {
		this.createContainer();
		if (this.models.length === 0) {
			this.getAndAddItems();
		} else {
			this.addModels();
		}
	}

	private createContainer() {
		this.container = document.createElement("div");
		this.container.id = this.elementId;
		this.appContainer.appendChild(this.container);
	}

	private async getAndAddItems() {
		getModelsConfig((modelName, modelId) => {
			if (this.container) {
				this.events.onModelLoaded(modelName, modelId);
				new ModelItem(modelName, modelId, this.container, this.events);
			}
		});
	}

	private addModels() {
		for (const model of this.models) {
			if (this.container) {
				new ModelItem(model.modelName, model.modelId, this.container, this.events);
			}
		}
	}
}
