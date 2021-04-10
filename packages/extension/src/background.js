const socket = io('http://localhost:5000', {
  auth: {
    token: `${localStorage.getItem('jwt')}`,
  },
  transports: ['websocket'],
  autoConnect: false,
});

// init tabs
localStorage.setItem('tabs', JSON.stringify({}));

const connectUser = async tabId => {
  chrome.tabs.get(tabId, async tab => {
    let allTabs = JSON.parse(localStorage.getItem('tabs'));
    const url = tab.url;
    if (url.includes('meet.google.com') && !allTabs[tabId]) {
      socket.connect();
      console.log('connected user');
      const meetId = url.split('/').slice(-1)[0].split('?')[0];
      allTabs[tabId] = meetId;
      localStorage.setItem('tabs', JSON.stringify(allTabs));
      socket.emit('joining', { meetId });
    }
  });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onActivated.addListener(e => {
    console.log('Activated', e);
    connectUser(e.tabId);
  });

  chrome.tabs.onRemoved.addListener((tabId, _) => {
    const allTabs = JSON.parse(localStorage.getItem('tabs'));
    delete allTabs[tabId];
    localStorage.setItem('tabs', JSON.stringify(allTabs));
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('updated tab', tab);
    connectUser(tabId);
  });

  // web sockets stuff
  socket.on('joining_success', data => {
    console.log(`joining_success`, data);
  });

  socket.on('user_left', data => {
    console.log(`user_left`, data);
  })
  socket.on('connect_error', err => {
    console.log(err.message); // prints the message associated with the error
  });
});

console.log('running in background');
