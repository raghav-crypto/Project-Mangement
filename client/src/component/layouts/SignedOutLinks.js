import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { explore } from "../../actions/project";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SignedOutLinks = ({ explore }) => {
  return (
    <Fragment>
      <li>
        <NavLink to="/register">SingUp</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => {
            explore();
          }}
          to="/"
          className="waves-effect waves-light btn-small"
        >
          Explore
        </NavLink>
      </li>
    </Fragment>
  );
};
SignedOutLinks.propTypes = {
  explore: PropTypes.func.isRequired,
};
export default connect(null, { explore })(SignedOutLinks);
