chrome.contextMenus.create({
  id: 'saveUrl',
  title: chrome.i18n.getMessage('contextTitle'),
});

chrome.contextMenus.create({
  id: 'deleteUrls',
  title: chrome.i18n.getMessage('contextRemove'),
});

function saveItem(item) {
  chrome.storage.sync.get((items) => {
    let isDuplicated = false;

    items.likedItems && items.likedItems.forEach((likedItem) => {
      if (likedItem.url === item.url) {
        isDuplicated = true;
      }
    });

    if (isDuplicated) {
      chrome.notifications.create('created', {
        type: 'basic',
        iconUrl: './dist/main-icon-128.png',
        title: 'SAVED',
        message: item.url,
      }, (_) => {
        setTimeout(() => {
          chrome.notifications.clear('created');
        }, 5000);
      });
      return;
    }

    chrome.storage.sync.set({
      likedItems: items.likedItems ? [...items.likedItems, item] : [item],
    }, () => {
      chrome.notifications.create('created', {
        type: 'basic',
        iconUrl: './dist/main-icon-128.png',
        title: 'SAVED',
        message: item.url,
      }, (_) => {
        setTimeout(() => {
          chrome.notifications.clear('created');
        }, 5000);
      });
    });
  });
}

chrome.contextMenus.onClicked.addListener((item) => {
  if (item.menuItemId === 'deleteUrls') {
    chrome.storage.sync.clear();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      const { url, title } = tab[0];
      saveItem({ url, title });
    });
  }
});

chrome.commands.onCommand.addListener(function (_) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    const { url, title } = tab[0];
    saveItem({ url, title });
  });
});
