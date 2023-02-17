import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");
let interval = 0;

form.addEventListener("submit", handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {resolve({ position, delay })}, delay);
    }
    else {      
      setTimeout(() => {reject({ position, delay })}, delay); 
    };
  });   
}

function handleSubmit(event) {
  event.preventDefault();
  const { elements: { delay, step, amount } } = event.currentTarget;
  interval = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, interval)
      .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  interval+=Number(step.value);
  };    
}