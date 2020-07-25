import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import FIELDS from "./formFields";
import {submitSurvey} from "../../actions/index";

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = FIELDS.map(({name, label}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please Confirm Your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
        style={{marginTop: "20px"}}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green white-text right btn-flat"
        style={{marginTop: "20px"}}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formValues: state.form.surveyForm.values,
});

export default connect(mapStateToProps, {submitSurvey})(
  withRouter(SurveyFormReview)
);
