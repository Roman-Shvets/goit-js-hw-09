import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let targetTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      targetTime = Date.parse(selectedDates[0]);
       if (targetTime > Date.now())
       startBtn.disabled = false;
       else Notify.failure("Please choose a date in the future");
  },
};

const startBtn = document.querySelector("[data-start]");
const refDays = document.querySelector("[data-days]");
const refHours = document.querySelector("[data-hours]");
const refMinutes = document.querySelector("[data-minutes]");
const refSeconds = document.querySelector("[data-seconds]");

startBtn.disabled = true;

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function timer() {
  setInterval(() => {
    const currentTime = Date.now();
      if (targetTime <= currentTime)
      return;
    refDays.textContent = addLeadingZero(convertMs(targetTime - currentTime).days);
    refHours.textContent = addLeadingZero(convertMs(targetTime - currentTime).hours);
    refMinutes.textContent = addLeadingZero(convertMs(targetTime - currentTime).minutes);
    refSeconds.textContent = addLeadingZero(convertMs(targetTime - currentTime).seconds);
  }, 1000);
};

startBtn.addEventListener("click", () => timer());