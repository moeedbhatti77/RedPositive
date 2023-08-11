const validateEmail = (email) =>
  email?.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? true
    : false;
const validateNumber = (number) => true;
// number?.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/) ? true : false;
module.exports = {
  validateEmail,
  validateNumber,
};
