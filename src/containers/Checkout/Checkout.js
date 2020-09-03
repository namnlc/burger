import React, {useState, useEffect} from 'react';

import CheckoutSummary from '../../components/Oder/CheckoutSummary/CheckoutSummary';

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({
        salad: 1,
        meat: 1,
        chesse: 1,
        bacon: 1,
    })

    useEffect(() => {
        console.log(props);
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        setIngredients(ingredients);
    }, [props, props.location.search]);

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/Checkout/contact-data');
    }

    return (
        <div>
            <CheckoutSummary 
                ingredients={ingredients}
                checkoutCanceled={checkoutCanceledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
        </div>
    );
}

export default Checkout;