import { ModelsListTemplate } from "./models-list";

export class RefreshMessage {
	private readonly container: HTMLElement | null;

	private readonly containerId = "refresh-message-container";

	constructor() {
		this.container = document.getElementById("app");
	}

	public showRefreshMessage() {
		if (this.container == null) {
			throw new Error("Root of extension has not been found");
		}

		const messageContainer = document.createElement("div");
		messageContainer.id = this.containerId;

		const message = document.createElement("p");
		message.innerText = "Please refresh the page to see the models";
		messageContainer.appendChild(message);

		const refreshButton = document.createElement("button");
		refreshButton.innerText = "Refresh";
		refreshButton.onclick = () => {
			chrome.tabs.reload();
			this.removeRefreshMessage();
			new ModelsListTemplate();
		};
		messageContainer.appendChild(refreshButton);

		this.container.appendChild(messageContainer);
	}

	public removeRefreshMessage() {
		if (this.container == null) {
			throw new Error("Root of extension has not been found");
		}

		const messageContainer = this.container.querySelector(`#${this.containerId}`);

		if (messageContainer != null) {
			this.container.removeChild(messageContainer);
		}
	}
}
