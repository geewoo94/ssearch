test('dev setting if there is not chrome', () => {
  require('../src/utils/devSetting');
  expect(window.chrome).toBeDefined();

  expect(window.chrome.history).toBeDefined();
  expect(window.chrome.history.search).toBeDefined();

  expect(window.chrome.search).toBeDefined();
  expect(window.chrome.search.query).toBeDefined();

  expect(window.chrome.storage).toBeDefined();
  expect(window.chrome.storage.sync).toBeDefined();
  expect(window.chrome.storage.sync.get).toBeDefined();
  expect(window.chrome.storage.sync.set).toBeDefined();

  delete window.chrome;
});
