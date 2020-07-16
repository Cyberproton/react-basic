import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const Burger = (props) => {

    const ingredientArray = Object.keys(props.ingredients).reduce((acc, ingredient) => {
        const len = props.ingredients[ingredient];
        for (let i = 0; i < len; i++) {
            acc.push(<BurgerIngredient key={ingredient + i} type={ingredient}/>);
        }
        return acc;
    }, []);

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="breadTop"/>
            {ingredientArray.length !== 0 ? ingredientArray : <p>Please start adding ingredients</p>}
            <BurgerIngredient type="breadBottom"/>
        </div>
    );
};

export default Burger;