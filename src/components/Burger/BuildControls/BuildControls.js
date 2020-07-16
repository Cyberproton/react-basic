import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' }
];

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => 
            <BuildControl 
                key={control.type} 
                label={control.label} 
                added={props.ingredientAdded.bind(this, control.type)}
                removed={props.ingredientRemoved.bind(this, control.type)}
                disabled={props.disabledControls[control.type]}/>)}
        <button 
            className={styles.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.purchased}>
            Order Now
        </button>
    </div>
);

export default BuildControls;