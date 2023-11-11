const qSelector = (selector = '') => document.querySelector(selector);

let isProcessed = false;
const operators = ['+', '-', '*', '/'];
let operations = [];

function span(el = '') {
  return `<span>${el}</span>`;
}

function display() {
  if (operations.length) {
    qSelector('.screen').innerHTML = span();
    operations.forEach((el) => {
      qSelector('.screen').innerHTML += span(el);
    });
  } else {
    qSelector('.screen').innerHTML = span('0');
  }
}

function calculate() {
  let result = 0;
  if (operations.length) {
    let operrands = operations.filter((operation) => !operators.find((operator) => operation === operator));
    let existedOperators = operations.filter((operation) => operators.find((operator) => operation === operator));

    result = operrands.reduce((a, b, i) => {
      let currOps = existedOperators[i - 1];
      if (currOps === '-') return parseFloat(a) - parseFloat(b);
      else if (currOps === '+') return parseFloat(a) + parseFloat(b);
      else if (currOps === '*') return parseFloat(a) * parseFloat(b);
      else if (currOps === '/') return parseFloat(a) / parseFloat(b);
    });
    return span('=') + span(result);
  }
  return null;
}

function pushOperator(op) {
  if (operations.length) {
    if (!operators.some((o) => o === operations[operations.length - 1])) {
      operations.push(op);
      display();
    }
  }
}

function pushOperrands(op) {
  if (!operations.length) {
    operations.push(op);
  } else {
    if (!isNaN(operations[operations.length - 1])) {
      operations[operations.length - 1] = operations[operations.length - 1] + op;
    } else {
      operations.push(op);
    }
  }
  display();
}

qSelector('.controls').addEventListener('click', (e) => {
  if (isProcessed) {
    operations = [];
    display();
    isProcessed = false;
  }

  let className = e.target.className;

  // CLEAR
  if (className === 'clear-all') {
    operations = [];
    display();
    isProcessed = false;
  }

  if (className === 'clear') {
    if (!isProcessed) {
      if (operations[operations.length - 1].length > 1) {
        operations[operations.length - 1] = operations[operations.length - 1].split('').slice(0, -1).join('');
      } else {
        operations.pop();
      }
    } else {
      operations = [];
      isProcessed = false;
    }
    display();
  }

  // PUSH OPERRANDS
  className === 'one' && pushOperrands('1');

  className === 'two' && pushOperrands('2');

  className === 'three' && pushOperrands('3');

  className === 'four' && pushOperrands('4');

  className === 'five' && pushOperrands('5');

  className === 'six' && pushOperrands('6');

  className === 'seven' && pushOperrands('7');

  className === 'eight' && pushOperrands('8');

  className === 'nine' && pushOperrands('9');

  if (className === 'zero' && operations.length && operations[operations.length - 1] !== '0') {
    pushOperrands('0');
  }

  if (
    className === 'period' &&
    operations.length &&
    !isNaN(operations[operations.length - 1]) &&
    !operations[operations.length - 1].includes('.')
  ) {
    operations[operations.length - 1] = operations[operations.length - 1] + '.';
    display();
  }

  // PUSH OPERATORS
  className === 'plus' && pushOperator('+');

  className === 'minus' && pushOperator('-');

  className === 'time' && pushOperator('*');

  className === 'divide' && pushOperator('/');

  // CALCULATE ALL
  if (className === 'equal' && operations.length > 2) {
    isProcessed = true;
    display();
    let value = calculate();
    if (value) qSelector('.screen').innerHTML += value;
  }
});

display();
