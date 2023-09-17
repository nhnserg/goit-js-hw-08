import throttle from 'lodash.throttle';

function saveToLocalStorage() {
  const emailInput = document.querySelector('input[name="email"]');
  const messageInput = document.querySelector('textarea[name="message"]');

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fillFormFromLocalStorage() {
  const formData =
    JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  const emailInput = document.querySelector('input[name="email"]');
  const messageInput = document.querySelector('textarea[name="message"]');

  emailInput.value = formData.email || '';
  messageInput.value = formData.message || '';
}

function handleSubmit(event) {
  event.preventDefault();

  const emailInput = document.querySelector('input[name="email"]');
  const messageInput = document.querySelector('textarea[name="message"]');

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
}

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(saveToLocalStorage, 500));

window.addEventListener('load', fillFormFromLocalStorage);

form.addEventListener('submit', handleSubmit);
