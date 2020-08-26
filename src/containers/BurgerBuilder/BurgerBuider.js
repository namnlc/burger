import React, { useState } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 1.3,
  meat: 0.7,
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState(
    {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    }
  );
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

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
    alert('You Continue');
  }

  const disabledInfo = {
    ...ingredients
  };

  for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary 
        ingredients={ingredients} 
        purchaseCanceled={purchaseCancelHandler} 
        purchaseContinued={purchaseContinueHandler}
        price={totalPrice}
        />
      </Modal>
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
};

export default BurgerBuilder;
