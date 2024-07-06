import { TemplateBase } from "./template-base";

export class InvalidSite extends TemplateBase {

	constructor() {
		super("invalid-site-container");
		this.add();
	}

	public add() {
		const messageContainer = document.createElement("div");
		messageContainer.id = this.elementId;

		const message = document.createElement("p");
		message.style.width = "200px";
		message.innerText = "The site you are on is not a valid Iventis site. Please navigate to a valid Iventis site to see the models.";
		messageContainer.appendChild(message);

		this.appContainer.appendChild(messageContainer);
	}
}
