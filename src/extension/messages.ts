import { getCurrentTab } from "./tabs";

export async function sendMessage<T>(message: { id: string; callback: (response: T) => void }) {
	const tab = await getCurrentTab();

	if (tab.id == null) {
		throw new Error("Tab id is null");
	}

	chrome.tabs.sendMessage(tab.id, message.id, message.callback);
}
