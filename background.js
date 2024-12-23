chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === 'translate') {
        fetch(`https://ftapi.pythonanywhere.com/translate?sl=${request.sourceLanguage}&dl=${request.targetLanguage}&text=${request.text}`)
            .then(response => response.json())
            .then(data => sendResponse({ translatedText: data["destination-text"] }))
            .catch(error => {
                console.error('Failed to fetch translation', error);
                sendResponse({ translatedText: request.text });
            });
        return true;
    }
});
