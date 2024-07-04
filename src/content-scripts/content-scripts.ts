chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
	if (message === "is-page-loaded") {
		const element = document.getElementsByClassName("mapboxgl-canvas");
		sendResponse(element != null);
	}
});
