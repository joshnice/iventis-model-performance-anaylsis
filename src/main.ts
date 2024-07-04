import { get } from "./api/api-helpers";
import { GET_MODELS } from "./api/url-contstant";
import { onNetworkResponseCompleted } from "./extension/network";
import { getCurrentTab } from "./extension/tabs";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
	throw new Error("#app not found");
}

app.innerHTML = `
  <div id="content">
    hello world
  </div>
`;

async function main() {
	const tab = await getCurrentTab();
	console.log("tab", tab);
	const response = await onNetworkResponseCompleted(GET_MODELS);
	console.log("response", response);
	const data = await get(response.url);
	console.log("data", data);

	const content = document.getElementById("content");

	console.log("content", content);

	if (content) {
		content.innerHTML = JSON.stringify(data);
	}
}

main();
