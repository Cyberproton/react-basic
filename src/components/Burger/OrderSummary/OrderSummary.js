import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map(key => 
        <li key={key}>   
            <span style={{textTransform: 'capitalize'}}>{key}: </span>{props.ingredients[key]}
        </li>);
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Ingredients:</p>
            <ul>{ingredients}</ul>
            <p><strong>PRICE: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.continue}>Order</Button>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Fragment>
    );
};

export default OrderSummary;