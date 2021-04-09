let isUserSignedIn = false;

// but it is for current user signedin in chrome
// chrome.identity.onSignInChanged.addListener((id, status) => {
//   alert(id + ' ' + status);
// });

// chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//   if (req.message === 'get_auth_token') {
//     chrome.identity.getAuthToken({ interactive: true }, token => {
//       if (chrome.runtime.lastError) {
//         console.log(chrome.runtime.lastError.message);
//         return;
//       }
//       console.log(token);
//     });
//   }
// });
console.log('running in background');
