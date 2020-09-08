import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
import axios from '../../axios-orders';

const BurgerBuilder = (props) => {
  const [ingredients, setIngredients] = useState(null);
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   axios.get('https://burger-e90db.firebaseio.com/ingredients.json')
  //   .then(res => {
  //     setIngredients(res.data);
  //     console.log(res.data);
  //   })
  //   .catch(error => {
  //     setError (true);
  //   });
  // },[])
  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum,el)=> {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    setPurchasing(true);
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
    }

    queryParams.push('price=' + totalPrice);
    const queryString = queryParams.join('&');


    props.history.push({
      pathname: '/checkout',
      search: "?" + queryString, 
    });
  }

  const disabledInfo = {
    ...props.ings
  };

  for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;

  let burger = error ? <p>Cant load ingredients!!!</p> : <Spinner />

  if ( props.ings ) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onAddIngredient}
          ingredientRemoved = {props.onRemoveIngredient}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          disabled={disabledInfo}
          price={props.price}
        />
      </Aux>
    );
    orderSummary = <OrderSummary
          ingredients={props.ings} 
          purchaseCanceled={purchaseCancelHandler} 
          purchaseContinued={purchaseContinueHandler}
          price={props.price}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);