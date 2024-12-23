document.addEventListener('DOMContentLoaded', () => {
    const hello = document.querySelector('#hello');
    const languages = fetchLanguages().then(data => Object.keys(data));
    const randomLanguage = languages.then(langs => langs[Math.floor(Math.random() * langs.length)]);

    async function fetchLanguages() {
        try {
            const res = await fetch('./languages.json');
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch languages', error);
            return {};
        }
    }

    randomLanguage.then(language => {
        chrome.runtime.sendMessage(
            {
                action: 'translate',
                text: 'Hello!',
                sourceLanguage: 'en',
                targetLanguage: language
            },
            (response) => {
                hello.textContent = response.translatedText;
            }
        );
    });
});
