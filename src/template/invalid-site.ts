import { TemplateBase } from "./template-base";

export class InvalidSite extends TemplateBase {

	constructor() {
		super("invalid-site-message");
		this.add();
	}

	public add() {
		const message = document.createElement("p");
		message.id = this.elementId;
		message.innerText = "The site you are on is not a valid Iventis site. Please navigate to a valid Iventis site to see the models.";

		this.appContainer.appendChild(message);
	}
}
