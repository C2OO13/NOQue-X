console.log('Hello Google Meet!');

$('body').append(`
  <div id="injected">
    <div>
      <label for="answer" id = "questionLabel">What is the question ?</label>
      <input type="text" name="answer" id="answer" />
    </div>
    <br>
    <div>
      <b>Time Left: </b>
      <b id="timer"> </b>
    </div>
    <br>
    <button id="submitAnswer">Submit</button>

  </div>
`);
$('#injected').css({
  width: '300px',
  height: '300px',
  position: 'absolute',
  right: '18px',
  bottom: '200px',
  zIndex: '100',
  display: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgb(221,221,221)',
});

$('#submitAnswer').click(async () => {
  let answer = $('#answer').val();
  $('#injected').css({
    display: 'none',
  });
  try {
    const questionId = $('#answer').attr('data-question');
    chrome.runtime.sendMessage({
      message: 'submit_response',
      questionId,
      answer,
    });
    $('#injected').css({
      display: 'none',
    });
  } catch (err) {
    console.log(err);
  }
});
