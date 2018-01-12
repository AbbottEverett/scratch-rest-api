const uuid = require('uuid');

const foods = [];

// Model is for manaing data state and
// performing the functional operations

function getAll() {
  return foods;
}

function getOne(id) {
  let response;
  let errors = []
  for (let food of foods) {
    if (food.id === id) response = food;
  }
  if (!response) {
    errors.push('Please make sure id is inputted correctly');
    response = { errors };
  }
  return response;
}

function create (input) {
  const name = input.name;
  const isTasty = input.isTasty;
  const errors = [];
  let response;

  if (!name || isTasty === undefined) {
    errors.push('Please include a name and taste preference');
    response = { errors };
  } else {
    const food = { id: uuid(), name, isTasty }
    foods.push(food);
    response = food;
  }

  return response;
}

module.exports = { getAll, getOne, create };
