let [seconds, minutes, hours] = [0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;
let submit = document.getElementById('form-button');

let inputHours = document.getElementById('form-hours');
let inputMinutes = document.getElementById('form-minutes');
let inputSeconds = document.getElementById('form-seconds');

document.getElementById('startTimer').addEventListener('click', () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 1000);
});

document.getElementById('pauseTimer').addEventListener('click', () => {
  clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(int);
  [seconds, minutes, hours] = [0, 0, 0];
  timerRef.innerHTML = '00 : 00 : 00';
});

function displayTimer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

  let h = hours < 10 ? '0' + hours : hours;
  let m = minutes < 10 ? '0' + minutes : minutes;
  let s = seconds < 10 ? '0' + seconds : seconds;

  timerRef.innerHTML = ` ${h} : ${m} : ${s}`;
}

function displayTimerReverse() {
  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(int);
    alert("Time's up!");
    return;
  }

  if (seconds > 0) {
    seconds--;
  } else {
    if (minutes > 0) {
      seconds = 59;
      minutes--;
    } else if (hours > 0) {
      seconds = 59;
      minutes = 59;
      hours--;
    } else {
      clearInterval(int);
      alert("Time's up!");
      return;
    }
  }

  let h = hours < 10 ? '0' + hours : hours;
  let m = minutes < 10 ? '0' + minutes : minutes;
  let s = seconds < 10 ? '0' + seconds : seconds;

  timerRef.innerHTML = `${h} : ${m} : ${s}`;
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  hours = +inputHours.value;
  minutes = +inputMinutes.value;
  seconds = +inputSeconds.value;
  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(int);
    [seconds, minutes, hours] = [0, 0, 0];
    timerRef.innerHTML = '00 : 00 : 00';
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';
    return;
  }

  if (
    hours < 0 ||
    hours > 24 ||
    minutes < 0 ||
    minutes > 60 ||
    seconds < 0 ||
    seconds > 60
  ) {
    hours = 0;
    minutes = 0;
    seconds = 0;
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';
    alert(`Dear user,

      Please insert values in the following range:

      Hours between 0 and 24
      Minutes between 0 and 60
      Seconds between 0 and 60

      Thanks & enjoy ❤️`);
    return;
  }
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimerReverse, 1000);
  inputHours.value = '';
  inputMinutes.value = '';
  inputSeconds.value = '';
});
