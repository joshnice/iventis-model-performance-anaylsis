export class InvalidSite {
	private readonly container: HTMLElement | null;

	private readonly containerId = "invalid-site-container";

	constructor() {
		this.container = document.getElementById("app");
	}

	public showInvalidSiteMessage() {
		if (this.container == null) {
			throw new Error("Root of extension has not been found");
		}

		const messageContainer = document.createElement("div");
		messageContainer.id = this.containerId;

		const message = document.createElement("p");
		message.style.width = "200px";
		message.innerText = "The site you are on is not a valid Iventis site. Please navigate to a valid Iventis site to see the models.";
		messageContainer.appendChild(message);

		this.container.appendChild(messageContainer);
	}
}
