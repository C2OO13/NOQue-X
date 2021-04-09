let isAuthenticated = false;
let user = {};

$(document).ready(async () => {
  setVisible('#login__container', false);
  setVisible('#loader__container', true);
  try {
    const res = await checkAuth();
    setVisible('#loader__container', false);
    setVisible('#main__container', true);
    isAuthenticated = true;
    user = res.data;
  } catch (err) {
    setVisible('#loader__container', false);
    setVisible('#login__container', true);
    console.log(err);
  }
});

// Utility Functions

const checkAuth = async () => {
  try {
    const { data: response } = await http.get(`/auth/check-auth`);
    // console.log(response);
    return Promise.resolve(response);
  } catch (err) {
    console.log('error', error);
    return Promise.reject(err);
  }
};

const setVisible = (selector, visible) => {
  if (!visible) {
    $(selector).css('display', 'none');
  } else {
    $(selector).css('display', 'flex');
    // const display = $(selector).css('display');
    // if (display !== 'flex') {
    //   $(selector).css('display', 'block');
    // }
  }
};

// Event listeners
$('#google__btn').click(() => {
  chrome.identity.getAuthToken({ interactive: true }, async token => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return;
    }
    try {
      const { data: response } = await http.get(`/auth/${token}`);
      user = response.data.user;
      localStorage.setItem('jwt', response.data.token);
      setVisible('#login__container', false);
      setVisible('#main__container', true);
    } catch (err) {
      console.log('error: ', err);
    }
  });
});

// second way - by background script
// document.getElementById('google__btn').addEventListener('click', () => {
//   chrome.runtime.sendMessage({ message: 'get_auth_token' });
// });
