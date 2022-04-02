const tipFormElem = document.querySelector('.tip-form');
const billInput = tipFormElem.querySelector('#bill');
const numberOfPeopleInput = tipFormElem.querySelector('#number-of-people');
const tipPercentElems = tipFormElem.querySelectorAll(
  '.tip-form__element--grid > input[type="radio"]',
);
const customTipInput = tipFormElem.querySelector('#tip-custom-percents');
const tipAmountElem = document.querySelector('#tip-amount');
const totalAmountElem = document.querySelector('#total-tip-amount');
const resetFormBtn = document.querySelector('.tip-calc__btn');

const MIN_PRICE_VALUE = 10;
const MAX_PRICE_VALUE = 100000;
const MIN_NUMBER_OF_PEOPLE = 1;
const MAX_NUMBER_OF_PEOPLE = 10;
const MIN_TIP_VALUE = 1;
const MAX_TIP_VALUE = 100;
const DECIMAL_POINT = 2;

const resetForm = () => {
  billInput.value = '';
  numberOfPeopleInput.value = '';
  billInput.classList.remove('invalid-field');
  numberOfPeopleInput.classList.remove('invalid-field');
  tipAmountElem.textContent = '$0.00';
  totalAmountElem.textContent = '$0.00';
  tipPercentElems.forEach((elem) => {
    elem.checked = false;
  });
  customTipInput.value = '';
};

resetFormBtn.addEventListener('click', resetForm);

const calcTip = () => {
  let tipAmountPerPerson = 0;
  let totalTipAmount = 0;
  let tipPercent = 0;
  const results = [];

  tipPercentElems.forEach((elem) => {
    if (elem.checked) {
      tipPercent = elem.value;
    }
  });

  if (billInput.value && (tipPercent || customTipInput.value) && numberOfPeopleInput.value) {
    tipAmountPerPerson =
      ((billInput.value / 100) * (tipPercent || customTipInput.value)) /
      numberOfPeopleInput.value;
    totalTipAmount = billInput.value / numberOfPeopleInput.value;
  }

  results.push(tipAmountPerPerson, totalTipAmount);

  return results;
};

const showResult = () => {
  const [tipAmountPerPerson, totalTipAmount] = calcTip();

  tipAmountElem.textContent = `$${tipAmountPerPerson.toFixed(DECIMAL_POINT)}`;
  totalAmountElem.textContent = `$${totalTipAmount.toFixed(DECIMAL_POINT)}`;
};

const setInputRangeValidation = (input, minValue, maxValue) => {
  if (input.validity.rangeOverflow) {
    input.setCustomValidity(`Choose between ${minValue} and ${maxValue}`);
    tipAmountElem.textContent = '$0.00';
    totalAmountElem.textContent = '$0.00';
  } else if (input.validity.rangeUnderflow) {
    input.setCustomValidity(`Choose between ${minValue} and ${maxValue}`);
    tipAmountElem.textContent = '$0.00';
    totalAmountElem.textContent = '$0.00';
  } else {
    input.setCustomValidity('');
    showResult();
  }
  input.reportValidity();
};

billInput.addEventListener('input', (evt) => {
  setInputRangeValidation(evt.target, MIN_PRICE_VALUE, MAX_PRICE_VALUE);
});

numberOfPeopleInput.addEventListener('input', (evt) => {
  evt.target.value = evt.target.value.replace(/[^0-9]/g, '');
  setInputRangeValidation(evt.target, MIN_NUMBER_OF_PEOPLE, MAX_NUMBER_OF_PEOPLE);
});

customTipInput.addEventListener('input', (evt) => {
  tipPercentElems.forEach((elem) => {
    elem.checked = false;
  });

  setInputRangeValidation(evt.target, MIN_TIP_VALUE, MAX_TIP_VALUE);
});

tipPercentElems.forEach((elem) => {
  elem.addEventListener('change', () => {
    showResult();
  });
});
