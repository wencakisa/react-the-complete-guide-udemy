import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const BurgerIngredient = ({ type }) => {
  const className = _.get(styles, type);

  if (type === 'breadTop') {
    return (
      <div className={className}>
        <div className={styles.seeds1}></div>
        <div className={styles.seeds2}></div>
      </div>
    );
  }

  return <div className={className}></div>;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
