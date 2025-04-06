import { getBaseUrl } from "../api/url-helpers";

export async function onNetworkResponseCompleted(url: string, callback: (url: chrome.webRequest.WebResponseCacheDetails) => void) {
	const baseUrl = await getBaseUrl();
	chrome.webRequest.onCompleted.addListener(
		(event) => {
			if (event.initiator === baseUrl) {
				callback(event);
			}
		},
		{
			urls: [url],
		},
	);
}
