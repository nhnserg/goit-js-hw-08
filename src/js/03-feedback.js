import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
// глобальний об'єет ФормДата
let formData = {};

function saveToLocalStorage(e) {
  // 1.1
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// 2.1
function fillFormFromLocalStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
    formData = JSON.parse(savedData);
    Object.entries(formData).forEach(([key, val]) => {
      formEl.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}
// після відправки все очиститця і все окей
function handleSubmit(e) {
  e.preventDefault();

  console.log(formData);
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
  e.target.reset();
}

form.addEventListener('input', throttle(saveToLocalStorage, 500));

window.addEventListener('load', fillFormFromLocalStorage);

form.addEventListener('submit', handleSubmit);

//1.1 универсальний скрипт за допомогою якого ми зберігаємо данні. динамічно додаємо в обьект потім цей об'єкт зберігаємо
//2.1 зберігаєтся всі дочирні елементи форми таким чином ми можемо динамічно до них звертатись, звертатись до значення велью, задавати велью і таке отримувати при деструктурезації. буде працювати з будьякою формою і кількістю полів.
