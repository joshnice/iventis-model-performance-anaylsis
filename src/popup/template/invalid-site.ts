import { TemplateBase } from "./template-base";

export class InvalidSite extends TemplateBase {

	private readonly type: "site" | "map";

	constructor(type: "site" | "map") {
		super("invalid-site-message");
		this.type = type;
		this.add();
	}

	public add() {
		const message = document.createElement("p");
		message.id = this.elementId;
		switch (this.type) {
			case "site":
				message.innerText = "The site you are on is not a valid Iventis site. Please navigate to a valid Iventis site to see the models.";
				break;
			case "map":
				message.innerText = "You are currently not on a map. Please navigate to a Iventis map";
		}

		this.appContainer.appendChild(message);
	}
}
