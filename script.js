const inputString = document.querySelector('.form__textaria');
const container = document.querySelector('.result');
const button = document.querySelector('.form__button');
const form = document.querySelector('.form');
const template = document.querySelector('template').content.querySelector('.result__block');
const formError = document.querySelector('.form__error');

const getString = () => {
   if (inputString.value !== '') {
      validation(false)
      countWords(inputString.value);
      form.reset()
   } else {
      validation(true)
   }
};

const validation = (state) => {
   if (!state) return formError.textContent = '';
   formError.textContent = 'Введите предложение';
};

const countWords = str => {
   const result = {}
   const array = str.replace(/[.,\/#!|()?$%\^&\*;:{}=\_`~()]/g, " ")
      .replace(/\s{2,}/g, " ").split(' ');
   array.forEach(item => {
      let newStr = item.toLowerCase();
      if (newStr !== '') {
         result[newStr] = (result[newStr] ?? 0) + 1
      };
   })
   return renderResult(result);
};

const renderResult = obj => {
   container.textContent = ''
   for (let item in obj) {
      const block = template.cloneNode(true);
      block.querySelector('.result__name').textContent = `${item}:`;
      block.querySelector('.result__value').textContent = obj[item];
      container.append(block);
   };
};

button.addEventListener('click', getString)