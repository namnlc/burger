import React, {useState} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ContactData = (props) => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        }
    })

    const [loading, setLoading] = useState(false);
    const [purchasing, setPurchasing] = useState (false);
    const orderHandler = (event) => {
        event.preventDefault();
            alert('You Continue');
        setLoading(true);
        const order = {
        ingredients: props.ingredients,
        price: props.totalPrice,
        customer: {
            name: 'Max Scha',
            address: {
            street: 'testStreet',
            zipCode: '41241',
            country: 'Germany'
            },
            email: 'test@test.com'
        },
        deliveryMethod: 'fastest'  
        }
        axios.post('/orders.json', order)
        .then(res=> {
        setLoading(false);
        setPurchasing(false);
        props.history.push('/');
        })
        .catch(error=> {
        setLoading(false);
        setPurchasing(false);
        });
    }
    let form = (
        <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={orderHandler}>Order</Button>
        </form>
    );
    if (loading) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
}

export default ContactData;