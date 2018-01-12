const shortid = require('shortid');

const foods = [];

// Model is for manaing data state and
// performing the functional operations

function getAll() {
  return foods;
}

function getOne(id) {
  let response = foods.filter(food => food.id === id)[0];
  let errors = []

  if (!response) {
    errors.push('Please make sure id is inputted correctly');
    response = { errors };
  }

  return response;
}

function create (input) {
  const errors = validateParams(input, []);
  let response;

  if (errors.length > 0) {
    response = { errors };
  } else {
    const food = { id: shortid.generate(), name: input.name, isTasty: input.isTasty };
    foods.push(food);
    response = food;
  }

  return response;
}

function update (id, input) {
  const data = foods.filter(food => food.id === id)[0];
  let errors = validateParams(input, []);
  let response;

  if (!data) {
    errors.push('Please make sure id is inputted correctly');
  }

  if (errors.length > 0) {
    response = { errors };
  } else {
    data.name = input.name;
    data.isTasty = input.isTasty;
    response = { data };
  }

  return response;
}

function remove (id) {
  const data = foods.filter(food => food.id === id)[0];
  let errors = [];
  const index = foods.indexOf(data);
  let response;
  console.log(data);
  console.log(index);

  if (!data) {
    errors.push('Please make sure id is inputted correctly');
  }

  if (errors.length > 0) {
    response = { errors };
  } else {
    response = { data };
    foods.splice(index, 1);
  }

  return response;
}

function validateParams(input, array) {
  if (!input.name || input.isTasty === undefined) {
    const msg = 'Please include a name and taste preference';
    array.push(msg);
  }
  return array;
}

module.exports = { getAll, getOne, create, update, remove };
