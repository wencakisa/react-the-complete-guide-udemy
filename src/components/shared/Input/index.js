import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

const INPUT_TYPES = {
  INPUT: 'input',
  TEXT_AREA: 'textarea',
  SELECT: 'select'
};

const getInputElementByType = (type, options) => {
  let inputElement;

  if (type === INPUT_TYPES.INPUT || type === INPUT_TYPES.TEXT_AREA) {
    inputElement = React.createElement(type, options);
  } else if (type === INPUT_TYPES.SELECT) {
    const selectOptions = [];

    for (let selectOption of options.options) {
      const optionElement = React.createElement(
        'option',
        { key: selectOption.value, value: selectOption.value },
        selectOption.displayValue
      );
      selectOptions.push(optionElement);
    }

    inputElement = React.createElement(type, options, selectOptions);
  }

  return inputElement;
};

const Input = ({
  onChange,
  label,
  shouldValidate,
  isValid,
  touched,
  elementType = INPUT_TYPES.INPUT,
  elementConfig
}) => {
  const inputElementClassName = classnames(styles.inputElement, {
    [styles.invalid]: touched && shouldValidate && !isValid
  });

  const inputElement = getInputElementByType(elementType, {
    onChange,
    className: inputElementClassName,
    ...elementConfig
  });

  return (
    <div className={styles.input}>
      <label className={styles.label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
