import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUser} from "../actions/index";

import Header from "./Header";
import Landing from "./Landing";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/sureveys/new" component={SurveysNew} />
        <Route exact path="/surveys" component={Dashboard} /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, {fetchUser})(App);
