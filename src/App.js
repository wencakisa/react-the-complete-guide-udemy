import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from './components';
import { BurgerBuilder, Checkout } from './containers';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
