import React, { useState, useEffect } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuider';

const App = () => {
  
  return (
    <div>
      <Layout>
       <BurgerBuilder /> 
      </Layout>
    </div>
  )
}

export default App;