import React, { Fragment, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { explore } from "../../actions/project";

const SignedInLinks = ({
  auth: { user, loading },
  logout,
  explore,
}) => {
  return (
    <Fragment>
      <li>
        <NavLink to="/new-project">New Project</NavLink>
      </li>
      <li>
        <NavLink onClick={logout} to="/login">
          Logout
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="waves-effect waves-light btn-small">
          {user === null ? "User" : user.name}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="waves-effect waves-light btn-small">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          onClick={() => {
            explore();
          }}
          className="waves-effect waves-light btn-small"
        >
          Explore
        </NavLink>
      </li>
    </Fragment>
  );
};
SignedInLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  explore: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout, explore })(
  SignedInLinks
);
