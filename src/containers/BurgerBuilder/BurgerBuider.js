import React, { useState, useEffect } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 1.3,
  meat: 0.7,
};

const BurgerBuilder = (props) => {
  const [ingredients, setIngredients] = useState(null);
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log(props);
    axios.get('https://burger-e90db.firebaseio.com/ingredients.json')
    .then(res => {
      setIngredients(res.data);
      console.log(res.data.chesse);
    })
    .catch(error => {
      setError (true);
    });
  },[props])

  const addIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  }; 
  const removeIngredientHandler = (type) => {
    const oldCount = ingredients[type];
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = totalPrice;
      const newPrice = oldPrice - priceDeduction;
      setTotalPrice(newPrice);
      setIngredients(updatedIngredients);
      updatePurchaseState(updatedIngredients);
  }

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum,el)=> {
      return sum + el;
    }, 0);
    setPurchasable(sum > 0);
  }

  const purchaseHandler = () => {
    setPurchasing(true);
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    //alert('You Continue');
    // setLoading(true);
    // const order = {
    //   ingredients: ingredients,
    //   price: totalPrice,
    //   customer: {
    //     name: 'Max Scha',
    //     address: {
    //       street: 'testStreet',
    //       zipCode: '41241',
    //       country: 'Germany'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'  
    // }
    // axios.post('/orders.json', order)
    // .then(res=> {
    //   setLoading(false);
    //   setPurchasing(false);
    // })
    // .catch(error=> {
    //   setLoading(false);
    //   setPurchasing(false);
    // });
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
    }
    const queryString = queryParams.join('&');


    props.history.push({
      pathname: '/checkout',
      search: "?" + queryString,
    });
  }

  const disabledInfo = {
    ...ingredients
  };

  for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;

  let burger = error ? <p>Cant load ingredients!!!</p> : <Spinner />

  if ( ingredients ) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved = {removeIngredientHandler}
          purchasable={purchasable}
          ordered={purchaseHandler}
          disabled={disabledInfo}
          price={totalPrice}
        />
      </Aux>
    );
    orderSummary = <OrderSummary 
          ingredients={ingredients} 
          purchaseCanceled={purchaseCancelHandler} 
          purchaseContinued={purchaseContinueHandler}
          price={totalPrice}
          />;
  }
  if (loading) {
    orderSummary = <Spinner />
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default BurgerBuilder;