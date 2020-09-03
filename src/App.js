import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuider';
import Checkout from './containers/Checkout/Checkout';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

const App = () => {
  
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App;