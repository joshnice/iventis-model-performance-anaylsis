import { getCurrentTab } from "./extension/tabs";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
	throw new Error("#app not found");
}

app.innerHTML = `
  <div>
    hello world
  </div>
`;

async function main() {
	const tab = await getCurrentTab();
	console.log("tab", tab);
}

main();
