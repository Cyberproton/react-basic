import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axiosOrder';

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
            purchasing: false,
            loading: false
        };
    }

    render() {
        const disabledControls = {
            ...this.state.ingredients
        };
        let summary = <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        continue={this.purchaseContinueHandler}
                        cancel={this.purchaseCancelHandler}
                        />;
        if (this.state.loading) {
            summary = <Spinner />;
        }
        for (let key in disabledControls) {
            disabledControls[key] = disabledControls[key] < 1;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {summary}
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
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                id: 1813715,
                name: 'Cyberproton',
                email: 'cyberproton@burger.com',
                purchaseDate: new Date().getDate()
            }
        };
        axios
            .post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false });
                alert('Burger Ordered');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
                alert('Some error has happened!');
            });
    };

}

export default BurgerBuilder;