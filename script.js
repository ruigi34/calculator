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
      // if (op === '*' || op === '/') {
      //   operations[operations.length - 1] = [operations[operations.length - 1], op]
      // }
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
      operations.pop();
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
  if (className === 'equal') {
    isProcessed = true;
    display();
    let value = calculate();
    if (value) qSelector('.screen').innerHTML += value;
  }
});

display();

// let arr = ['22', '+', '3', '*', '4', '/', '2', '-', '2'];

// let narr = arr.map((a, i, ar) => {
//   if (a === '*' || a === '/') {
//     return [ar[i - 1], a, ar[i + 1]];
//   }
//   return a;
// });

// let vnarr = narr
//   .map((a, i, ar) => {
//     if (Array.isArray(ar[i - 1]) || Array.isArray(ar[i + 1])) {
//       return null;
//     }
//     return a;
//   })
//   .filter((a) => a !== null);

// let xvnarr = vnarr.map((a, i, ar) => {
//   if (Array.isArray(a) && Array.isArray(ar[i + 1])) return [[a[0], a[1], ar[i + 1][0]], ar[i + 1][1], ar[i + 1][2]];
//   return a;
// });

// console.log(narr);
// console.log(vnarr);
// console.log(xvnarr);
