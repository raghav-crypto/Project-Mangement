import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Navbar = ({auth: { loading, isAuthenticated }}) => {
  return (
    <header>
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">
            MarioPlan
          </Link>
          <Link to="/" className="sidenav-trigger" data-target="mobile-links">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            { (isAuthenticated && !loading) ? <SignedInLinks /> : <SignedOutLinks /> }
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-links">
      { (isAuthenticated && !loading) ? <SignedInLinks /> : <SignedOutLinks /> }
      </ul>
    </header>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, {})(Navbar);
