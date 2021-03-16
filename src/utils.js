import _ from 'lodash';

export const transformObjectToQueryParams = obj => {
  const transformedQueryParams = _.map(
    obj,
    (value, key) => `${key}=${JSON.stringify(value)}`
  );
  const queryParamsString = _.join(transformedQueryParams, '&');

  return queryParamsString;
};
