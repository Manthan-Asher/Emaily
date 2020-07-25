import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUser} from "../actions/index";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          {this.props.auth && this.props.auth !== false ? (
            <Redirect to="/surveys" />
          ) : (
            <Redirect to="/" />
          )}
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys/new" component={SurveyNew} />
          <Route exact path="/surveys" component={Dashboard} />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {auth: state.auth};
};

export default connect(mapStateToProps, {fetchUser})(App);
