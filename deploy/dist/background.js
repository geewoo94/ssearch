chrome.contextMenus.create({
  id: 'saveUrl',
  title: chrome.i18n.getMessage('contextTitle'),
});

chrome.contextMenus.create({
  id: 'deleteUrls',
  title: chrome.i18n.getMessage('contextRemove'),
});

function saveItem({ url, title, count }) {
  chrome.storage.sync.get((items) => {
    let isDuplicated = false;
    items.likedItems && items.likedItems.forEach((likedItem) => {
      if (likedItem.url === url) {
        isDuplicated = true;
      }
    });

    if (isDuplicated) {
      alertNotification();
      return;
    }

    function alertNotification() {
      chrome.notifications.create('created', {
        type: 'basic',
        iconUrl: './dist/main-icon-128.png',
        title: 'SAVED',
        message: url,
      }, () => {
        setTimeout(() => {
          chrome.notifications.clear('created');
        }, 4000);
      });
    }

    chrome.storage.sync.set({
      likedItems: items.likedItems ? [...items.likedItems, { url, title, count }] : [{ url, title, count }],
    }, alertNotification);
  });
}

chrome.contextMenus.onClicked.addListener((item) => {
  if (item.menuItemId === 'deleteUrls') {
    chrome.storage.sync.clear();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      const { url, title } = tab[0];
      saveItem({ url, title, count: 0 });
    });
  }
});

chrome.commands.onCommand.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    const { url, title } = tab[0];
    saveItem({ url, title, count: 0 });
  });
});
