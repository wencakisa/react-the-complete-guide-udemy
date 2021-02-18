import React, { Component } from 'react';

import { Layout } from './components';
import { BurgerBuilder } from './containers';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
