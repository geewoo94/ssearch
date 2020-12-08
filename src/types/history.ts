interface history extends chrome.history.HistoryItem {
  origin?: string;
  count?: number;
}

export default history;
