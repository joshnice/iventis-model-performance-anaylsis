import { getCurrentTab } from "./tabs";

export async function sendMessage<T>(messageId: string) {
	const tab = await getCurrentTab();

	return new Promise<T>((resolve) => {
		if (tab.id == null) {
			throw new Error("Tab id is null");
		}

		chrome.tabs.sendMessage(tab.id, messageId, (res) => {
			resolve(res);
		});
	});
}
