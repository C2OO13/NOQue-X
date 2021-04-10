$(document).ready(async () => {
  setVisible('#login__container', 'none');
  setVisible('#loader__container', 'flex');
  try {
    const res = await checkAuth();
    setVisible('#loader__container', 'none');
    setVisible('#main__container', 'block');
    afterAuth();
  } catch (err) {
    setVisible('#loader__container', 'none');
    setVisible('#login__container', 'flex');
    console.log(err);
  }
});

const setVisible = (selector, as) => {
  $(selector).css('display', as);
};

/**
 * Utility Functions
 */
const afterAuth = async () => {
  try {
    chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
      const url = tabs[0].url;
      if (url.includes('meet.google.com')) {
        const meetId = url.split('/').slice(-1)[0].split('?')[0];
        const {
          data: { access },
        } = await checkAdminAccess(meetId);
        console.log(access);
        if (access) {
          showQuesions(meetId);
        } else {
          $('#message').html('<p>Extension Activated</p>');
        }
      } else {
        $('#error').html(
          `<p class='text--center text--lg v-flex'><strong>Extension only works in Google Meets</strong></p>`
        );
      }
    });
  } catch (err) {
    $('#error').html(err);
  }
};

const showQuesions = async (meetId) => {
  const { data: questionsList } = await fetchQuesions(meetId);
  let str = `<h3 class='text--center text--lg'>Today's Questions</h3>`;
  // console.log(questionsList);
  questionsList.forEach((question) => {
    if (question.broadcasted) {
      str += `
      <div class="question__row">
        <div class="item question__body">${question.body}</div>
        <div class='item question__status'>Already Broadcasted</div>
      </div>`;
    } else {
      str += `
      <div class="question__row">
        <div class="item question__body">${question.body}</div>
        <button class='item question__status--btn' data-questionId=${question._id}>Broadcasted Now</button>
      </div>`;
    }
  });
  $('#questions__list').html(str);
  // add Broadcast event listener
  addQbtnListeners();
};

const addQbtnListeners = () => {
  document.querySelectorAll('.question__status--btn').forEach((qBtn) => {
    qBtn.addEventListener('click', () => {
      const questionId = qBtn.dataset.questionid;
      // console.log('Sending broadcast request to background from popup');
      chrome.runtime.sendMessage({
        message: 'broadcast_question_req',
        questionId,
      });
    });
  });
};

/**
 * side effects
 */

const fetchQuesions = async (meetId) => {
  try {
    const { data: response } = await http.get(`/questions/${meetId}/today`);
    return Promise.resolve(response);
  } catch (err) {
    console.log('error', err);
    return Promise.reject(err);
  }
};

const checkAdminAccess = async (meetId) => {
  try {
    const { data: response } = await http.get(`/classes/access/${meetId}`);
    return Promise.resolve(response);
  } catch (err) {
    console.log('error', err);
    return Promise.reject(err);
  }
};

const checkAuth = async () => {
  try {
    const { data: response } = await http.get(`/auth/check-auth`);
    // console.log(response);
    return Promise.resolve(response);
  } catch (err) {
    console.log('error', err);
    return Promise.reject(err);
  }
};

/**
 * Event listeners
 */
$('#google__btn').click(() => {
  chrome.identity.getAuthToken({ interactive: false }, async (token) => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return;
    }
    try {
      const { data: response } = await http.get(`/auth/${token}`);
      user = response.data.user;
      console.log('User is ', user);
      setVisible('#login__container', 'none');
      setVisible('#main__container', 'block');
    } catch (err) {
      console.log('error: ', err);
    }
  });
});

$('#logout_btn').click(() => {
  chrome.identity.getAuthToken({ interactive: true }, async (token) => {
    // console.log(token);
    chrome.identity.removeCachedAuthToken({ token: token }, function () {
      alert('removed');
    });
    localStorage.removeItem('jwt');
    setVisible('#login__container', 'flex');
    setVisible('#main__container', 'block');
  });
});

// second way - by background script
// document.getElementById('google__btn').addEventListener('click', () => {
//   chrome.runtime.sendMessage({ message: 'get_auth_token' });
// });
