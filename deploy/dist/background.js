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

    items.likedUrls.forEach((url) => {
      if (url.pageUrl === item.pageUrl) {
        isDuplicated = true;
      }
    });

    if (isDuplicated) {
      chrome.notifications.create('created', {
        type: 'basic',
        iconUrl: './dist/main-icon-128.png',
        title: 'SAVED',
        message: item.pageUrl,
      }, (_) => {
        setTimeout(() => {
          chrome.notifications.clear('created');
        }, 5000);
      });
      return;
    }

    chrome.storage.sync.set({
      likedUrls: items.likedUrls ? [...items.likedUrls, item] : [item],
    }, () => {
      chrome.notifications.create('created', {
        type: 'basic',
        iconUrl: './dist/main-icon-128.png',
        title: 'SAVED',
        message: item.pageUrl,
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
    saveItem(item);
  }
});

chrome.commands.onCommand.addListener(function (_) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    saveItem({ pageUrl: tab[0].url });
  });
});
