import React, {Component} from "react";
import {reduxForm, Field} from "redux-form";
import SurveyField from "./SurveyField";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

export class SurveyForm extends Component {
  renderField() {
    return (
      <div>
        {FIELDS.map(({label, name}) => {
          return (
            <Field
              key={name}
              name={name}
              label={label}
              component={SurveyField}
              type="text"
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderField()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  error.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach(({name}) => {
    if (!values[name]) {
      error[name] = `You must provide a ${name}`;
    }
  });
  return error;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
