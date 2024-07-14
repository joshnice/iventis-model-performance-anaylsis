import type { ModelConfig } from "../types/models-config";
import { TemplateBase } from "./template-base";
import "./model-item.css";

type Events = {
	onModelSelected: (modelName: string, modelId: string) => void
}

export class ModelItem extends TemplateBase {
	private readonly name: string;

	private readonly modelId: string;

	private readonly listContainer: HTMLDivElement;

	private readonly events: Events;


	constructor(modelConfig: ModelConfig, listContainer: HTMLDivElement, events: Events) {
		super("model-item");
		this.name = modelConfig.name;
		this.modelId = modelConfig.assetId;
		this.listContainer = listContainer;
		this.events = events;
		this.add();
	}

	public add() {
		const itemButton = document.createElement("button");

		itemButton.innerText = this.name;
		itemButton.id = this.elementId;

		itemButton.onclick = () => {
			this.events.onModelSelected(this.name, this.modelId)
		}


		this.listContainer.appendChild(itemButton);
	}
}
