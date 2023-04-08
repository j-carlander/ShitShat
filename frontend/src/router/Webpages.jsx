import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import PageHeader from "../Components/PageHeader/PageHeader";
import RegistrationForm from "../Components/RegistrationForm/RegistrationForm";
import PageFooter from "../Components/PageFooter/PageFooter";

const Webpages = () => {
  return (
    <Router>
      <Route exact path="/" component={RegistrationForm} />
    </Router>
  );
};

export default Webpages;
