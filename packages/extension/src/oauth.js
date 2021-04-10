window.onload = function () {
  document.querySelector('#google__btn').addEventListener('click', function () {
    console.log(chrome.identity);
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      console.log(token);
    });
  });
};
