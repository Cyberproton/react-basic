import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
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
            ingredients: null,
            totalPrice: 5.0,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        axios
            .get('https://react-project-41cd9.firebaseio.com/ingredients.json')
            .then(response => { this.setState({ ingredients: response.data }) })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    render() {
        const disabledControls = {
            ...this.state.ingredients
        };
        
        for (let key in disabledControls) {
            disabledControls[key] = disabledControls[key] < 1;
        }

        let summary = null;
        let burger = this.state.error ? <p>Oops! Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            summary =   <OrderSummary 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            continue={this.purchaseContinueHandler}
                            cancel={this.purchaseCancelHandler}
                        />;
            burger =    <Fragment>
                            <Burger ingredients={this.state.ingredients}/>
                            <BuildControls 
                                ingredientAdded={this.addIngredientHandler} 
                                ingredientRemoved={this.removeIngredientHandler}
                                disabledControls={disabledControls}
                                price={this.state.totalPrice}
                                purchasable={this.state.purchasable}
                                purchased={this.purchaseHandler}
                            />
                        </Fragment>;
        }
        if (this.state.loading) {
            summary = <Spinner />;
        }
        
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {summary}
                </Modal>
                {burger}
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
                purchaseDate: new Date().toJSON()
            }
        };
        axios
            .post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
            });
    };

}

export default withErrorHandler(BurgerBuilder, axios);