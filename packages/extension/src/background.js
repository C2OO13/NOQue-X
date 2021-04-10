const socket = io('http://localhost:5000', {
  transports: ['websocket'],
  autoConnect: false,
});

// init tabs
localStorage.setItem('tabs', JSON.stringify({}));

const connectUser = async (tabId) => {
  chrome.tabs.get(tabId, async (tab) => {
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
  chrome.tabs.onActivated.addListener((e) => {
    console.log('Activated', e);
    connectUser(e.tabId);
    // for activity
    chrome.tabs.get(e.tabId, tab => {
      if (!tab.url.includes('meet.google.com')) {
        let message = `Visited ${
          tab.url === '' ? 'new tab' : tab.url.split('/')[2]
        } at ${new Date().toLocaleTimeString()}`;
        socket.emit('updateActivity', {
          message,
          flag: 1,
          updateTime: true,
          url: tab.url,
        });
      }
    });
  });

  chrome.tabs.onCreated.addListener(tab => {
    const message = `Created a new tab at ${new Date().toLocaleTimeString()}`;
    socket.emit('updateActivity', { message, flag: 1, updateTime: true });
  });

  chrome.tabs.onRemoved.addListener((tabId, _) => {
    const message = `Removed a tab at ${new Date().toLocaleTimeString()}`;
    const allTabs = JSON.parse(localStorage.getItem('tabs'));
    delete allTabs[tabId];
    console.log('Removed', tabId);
    localStorage.setItem('tabs', JSON.stringify(allTabs));
    socket.emit('updateActivity', { message, flag: 1, updateTime: true });
  });

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log('updated tab', tab);
    connectUser(tabId);

    if (changeInfo.url) {
      const message = `Visited a ${
        changeInfo.url === '' ? 'new tab' : changeInfo.url.split('/')[2]
      } at ${new Date().toLocaleTimeString()}`;
      socket.emit('updateActivity', {
        message,
        flag: 1,
        updateTime: true,
        url: changeInfo.url,
      });
    } else if (changeInfo.audible) {
      const message = `Audio was fired from ${
        tab.url === '' ? 'new tab' : tab.url.split('/')[2]
      } at ${new Date().toLocaleTimeString()}`;
      socket.emit('updateActivity', { message, flag: 1, url: tab.url });
      // console.log(message);
    }
  });

  chrome.windows.onBoundsChanged.addListener(window => {
    const message = `Resized a window at ${new Date().toLocaleTimeString()}`;
    // console.log(message, window);
    socket.emit('updateActivity', {
      message,
      flag: 0,
      updateTime: false,
      url: '',
    });
  });

  chrome.downloads.onCreated.addListener(download => {
    const message = `Downloaded file ${
      download.referrer
    } at ${new Date().toLocaleTimeString()}`;
    // console.log(message);
    socket.emit('updateActivity', {
      message,
      flag: 1,
      url: download.url,
      updateTime: true,
    });
  });
  chrome.windows.onFocusChanged.addListener(window => {
    const message = `Switched to a new window at ${new Date().toLocaleTimeString()}`;
    socket.emit('updateActivity', {
      message,
      flag: 1,
      updateTime: true,
      url: '',
    });
  });

  // web sockets stuff
  socket.on('joining_success', (data) => {
    console.log(`joining_success`, data);
  });

  socket.on('user_left', (data) => {
    console.log(`user_left`, data);
  });
  socket.on('connect_error', (err) => {
    console.log(err.message); // prints the message associated with the error
  });

  socket.on('question', (data) => {
    // console.log('Obtained question from backend', data);
    let meetUrl = `https://meet.google.com/${data.meetId}`;
    // console.log('Meet URL calculated', meetUrl);
    chrome.tabs.query({ url: meetUrl }, (tabs) => {
      console.log('URL OF TAB', tabs[0].url);
      const bdy = JSON.stringify(data.body);
      const qid = JSON.stringify(data._id);
      const responseTime = JSON.stringify(data.responseTime);
      chrome.tabs.executeScript(tabs[0].id, {
        code: `
          document.getElementById('injected').style.display='flex';
          document.getElementById('questionLabel').innerText = ${bdy};
          document.getElementById('answer').setAttribute('data-question',${qid})
          let k = ${responseTime};
          var interval = setInterval(()=>{
            document.getElementById('timer').innerText = k;
            k--;
          },1000);
          setTimeout(function () {
            clearInterval(interval);
            document.getElementById('injected').style.display='none';
          }, ${responseTime}*1000 + 1000);
          `,
      });
    });
  });
});

chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  const { message, questionId } = req;

  if (message === 'broadcast_question_req') {
    console.log(
      'Inside background: Received message from popup about broadcasting'
    );
    socket.emit('broadcast_question', { questionId });
  } else if (message === 'submit_response') {
    const { answer } = req;
    console.log(answer);
    const responses = await http.patch(`/responses/${questionId}`, {
      response: answer,
    });
    console.log(responses);
  }

  sendResponse(true);
});

console.log('running in background');
