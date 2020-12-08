(function devSetting() {
  if (!chrome || !chrome.history) {
    window.chrome = {};

    window.chrome.history = {
      search: async (query, callback) => {
        const histories = await fetch('./mockHistory.json');
        const parsed = await histories.json();
        callback(parsed);
      }
    };

    window.chrome.search = {
      query: (option, callback) => {
        console.log(option);
        callback();
      }
    };

    window.chrome.storage = {
      sync: {
        get: (callback) => {
          callback({
            likedItems: [
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
              { title: 'mocktitle', url: 'https://www.google.com' },
            ]
          });
        }
      }
    };
  }
})();
