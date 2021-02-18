import React from 'react';

import _ from 'lodash';

import BurgerIngredient from './BurgerIngredient';
import styles from './styles.module.css';

const Burger = ({ ingredients }) => {
  const transformedIngredients = _(ingredients)
    .map((count, ingredient) => {
      return [...Array(count)].map((_, index) => (
        <BurgerIngredient key={`${ingredient}-${index}`} type={ingredient} />
      ));
    })
    .reduce((result, ingredient) => result.concat(ingredient), []);

  return (
    <div className={styles.burger}>
      <BurgerIngredient type="breadTop" />
      {_.isEmpty(transformedIngredients)
        ? 'Please add some ingredients.'
        : transformedIngredients}
      <BurgerIngredient type="breadBottom" />
    </div>
  );
};

export default Burger;
