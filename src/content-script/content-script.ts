chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
	if (message === "PAGE_ALREADY_LOADED") {
		const element = document.getElementsByClassName("mapboxgl-canvas");
		sendResponse(element != null);
	}
});

