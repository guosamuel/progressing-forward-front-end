import React from 'react';
import TopHeader from './containers/TopHeader'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./containers/Login"

function App() {
  return (
    <Router>
      <div>
      <TopHeader />
      <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
