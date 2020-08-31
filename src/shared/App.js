import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Invitation, NotFound } from '../route';

const kakaoAuth = () => {
  return (
    <div></div>
  );
};
const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/invitation" component={Invitation} />
        <Route path="/kakaoAuth" component={kakaoAuth} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;