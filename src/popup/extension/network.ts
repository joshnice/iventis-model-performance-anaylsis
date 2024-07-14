export function onNetworkResponseCompleted(url: string): Promise<chrome.webRequest.WebResponseCacheDetails> {
	return new Promise((res) => {
		chrome.webRequest.onCompleted.addListener(
			(event) => {
				res(event);
			},
			{
				urls: [url],
			},
		);
	});
}
