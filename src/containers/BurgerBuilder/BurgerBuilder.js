import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1
};

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                meat: 0,
                bacon: 0,
                cheese: 0
            },
            totalPrice: 5.0,
            purchasable: false,
            purchasing: false
        };
    }

    render() {
        const disabledControls = {
            ...this.state.ingredients
        };
        for (let key in disabledControls) {
            disabledControls[key] = disabledControls[key] < 1;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        continue={this.purchaseContinueHandler}
                        cancel={this.purchaseCancelHandler}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledControls={disabledControls}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchased={this.purchaseHandler}
                    />
            </Fragment>
        );
    }

    addIngredientHandler = (type) => {
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = this.state.ingredients[type] + 1;
        this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
        this.updatePurchasableState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredient = {
            ...this.state.ingredients
        };
        const shouldUpdate = this.state.ingredients[type] !== 0;
        if (!shouldUpdate) {
            return;
        }
        updatedIngredient[type] = this.state.ingredients[type] - 1;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
        this.updatePurchasableState(updatedIngredient);
    }

    updatePurchasableState = (ingredients) => {
        const amount = Object.keys(ingredients).reduce((sum, key) => sum + ingredients[key], 0);
        this.setState({ purchasable: amount > 0 });
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        alert('Burger Ordered');
        this.setState({ purchasing: false });
    };

}

export default BurgerBuilder;