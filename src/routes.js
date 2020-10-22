import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { PrivateRouter, PrivateRouterAdmin } from './routers/PrivateRoutes';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRouterAdmin path="/home" component={Home} />
        <PrivateRouter path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
