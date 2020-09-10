import React, {useState} from 'react';
import axios from '../../../axios-orders';
import {connect} from 'react-redux';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const ContactData = (props) => {
    
    const [contactData, setContactData] = useState ({   
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name' 
                },
                value:'',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street' 
                },
                value:'',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country' 
                },
                value:'',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code' 
                },
                value:'',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail' 
                },
                value:'',
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value:'',
            }

    });

    const [loading, setLoading] = useState(false);
    //const [purchasing, setPurchasing] = useState (false);
    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {};
        for( let indentiferElement in contactData) {
            formData[indentiferElement] = contactData[indentiferElement].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
        }
        axios.post( '/orders.json', order )
            .then( response => {
                setLoading(false);
                props.history.push('/');
            } )
            .catch( error => {
                setLoading(false);
            } );
    }

    const formArray = [];
    for( let key in contactData) {
        formArray.push({
            id: key,
            config: contactData[key],
        })
    }

    const inputChangedHandler = (event, inputIndentifier) => {
        //console.log(event.target.value);
        const updatedOrderForm = {
            ...contactData
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIndentifier]
        } 
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIndentifier] = updatedFormElement;
        setContactData(updatedOrderForm);
    }

    let form = (
        <form onSubmit={orderHandler}>
                {formArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementConfig={formElement.config.elementConfig} 
                        elementType={formElement.config.elementType}
                        value={formElement.value} 
                        changed={(event) =>inputChangedHandler(event, formElement.id)}
                        />
                ))}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);