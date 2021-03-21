import React, { useEffect, Suspense } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import { authCheckState } from './store/actions';
import { Layout } from './components';
import { BurgerBuilder, Logout } from './containers';

const Checkout = React.lazy(() => import('./containers/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders'));
const Auth = React.lazy(() => import('./containers/Auth'));

const LoadingFallback = () => <p>Loading...</p>;

const App = ({ onTryAutoSignup, isAuthenticated }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const routes = [
    { path: '/auth', component: Auth, exact: false },
    { path: '/logout', component: Logout, exact: false },
    { path: '/', component: BurgerBuilder, exact: true }
  ];

  if (isAuthenticated) {
    const protectedRoutes = [
      { path: '/checkout', component: Checkout, exact: false },
      { path: '/orders', component: Orders, exact: false }
    ];

    routes.push(...protectedRoutes);
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
            {_.map(routes, ({ path, component, exact }) => (
              <Route
                key={path}
                path={path}
                component={component}
                exact={exact}
              />
            ))}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: !_.isNull(token)
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
