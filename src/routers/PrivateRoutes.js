import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../helpers/authenticate';

export const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export const PrivateRouterAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() &&
      isAuthenticated().user_type.toUpperCase() === 'ADMIN' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/profile', state: { from: props.location } }}
        />
      )
    }
  />
);
