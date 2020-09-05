import React, {useState, useEffect} from 'react';

import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Oder/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const query = new URLSearchParams( this.props.location.search );
        const ingredients = {};
        let price = 0;
        for ( let param of query.entries() ) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        setIngredients(ingredients);
        //console.log(ingredients);
        setTotalPrice(price);
    }, [props, props.location.search]);

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    return (
        <div>
            <CheckoutSummary 
                ingredients={ingredients}
                checkoutCanceled={checkoutCanceledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route 
            path={props.match.path + '/contact-data'} 
            //component={ContactData}
            render={() => (<ContactData ingredients={ingredients} price={totalPrice} {...props}/>)}
            />
        </div>
    );
}

export default Checkout;