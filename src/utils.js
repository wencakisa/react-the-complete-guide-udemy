import _ from 'lodash';

export const transformObjectToQueryParams = obj => {
  const transformedQueryParams = _.map(
    obj,
    (value, key) => `${key}=${JSON.stringify(value)}`
  );
  const queryParamsString = _.join(transformedQueryParams, '&');

  return queryParamsString;
};

export const checkInputValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = !_.isEmpty(value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
