import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

function saveToLocalStorage() {
  formData = Object.fromEntries(new FormData(formEl));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillFormFromLocalStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      formData = JSON.parse(savedData);
      Object.entries(formData).forEach(([key, val]) => {
        if (formEl.elements[key]) {
          formEl.elements[key].value = val;
        }
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  console.log(formData);
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
  formEl.reset();
}

formEl.addEventListener('input', throttle(saveToLocalStorage, 500));
window.addEventListener('load', fillFormFromLocalStorage);
formEl.addEventListener('submit', handleSubmit);
//1.1 универсальний скрипт за допомогою якого ми зберігаємо данні. динамічно додаємо в обьект потім цей об'єкт зберігаємо
//2.1 зберігаєтся всі дочирні елементи форми таким чином ми можемо динамічно до них звертатись, звертатись до значення велью, задавати велью і таке отримувати при деструктурезації. буде працювати з будьякою формою і кількістю полів.

// Version 2

import throttle from 'lodash.throttle';

const localStorageKey = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
const { email, message } = feedbackForm.elements;

const loadFormState = () => {
  const savedState = JSON.parse(localStorage.getItem(localStorageKey));
  if (savedState) {
    email.value = savedState.email;
    message.value = savedState.message;
  }
};

const saveFormState = throttle(() => {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ email: email.value, message: message.value })
  );
}, 500);

[...feedbackForm.querySelectorAll('input, textarea')].forEach(inputField => {
  inputField.addEventListener('input', saveFormState);
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });
  feedbackForm.reset();
  localStorage.removeItem(localStorageKey);
});

window.addEventListener('load', loadFormState);