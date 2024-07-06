import { TemplateBase } from "./template-base";

type Events = {
	onRefreshClicked: () => void;
}

export class RefreshMessage extends TemplateBase {
	private readonly events: Events;

	constructor(events: Events) {
		super("refresh-message-container");
		this.events = events;
		this.add();
	}

	public add() {
		const messageContainer = document.createElement("div");
		messageContainer.id = this.elementId;

		const message = document.createElement("p");
		message.innerText = "Please refresh the page to see the models";
		message.id = `${this.elementId}-text`;
		messageContainer.appendChild(message);


		const refreshButton = document.createElement("button");
		refreshButton.id = `${this.elementId}-button`;
		refreshButton.innerText = "Refresh";
		refreshButton.onclick = () => {
			this.events.onRefreshClicked();
			chrome.tabs.reload();
		};

		messageContainer.appendChild(refreshButton);
		this.appContainer.appendChild(messageContainer);
	}
}
