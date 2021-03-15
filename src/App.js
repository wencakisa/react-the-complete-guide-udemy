import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from './components';
import { BurgerBuilder, Checkout, Orders, Auth, Logout } from './containers';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
