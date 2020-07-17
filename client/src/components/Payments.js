import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import {handleToken} from "../actions/index";

export class Payments extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
          name="Emaily"
          description="Pay ₹100 for 5 email credits"
          amount={10000}
          currency="INR"
          token={(token) => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">Add Credits</button>
        </StripeCheckout>
      </div>
    );
  }
}

export default connect(null, {handleToken})(Payments);
