import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { loadUser } from "../../actions/auth";

const Login = ({ isAuthenticated, login, loadUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container login z-depth-2">
      <div className="row">
        <form className="col s12" onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Email"
                name="email"
                type="email"
                className="validate"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Password"
                value={password}
                name="password"
                type="password"
                className="validate"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <button
              type="submit"
              className="col m3 s4 btn waves-effect waves-teal"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
          <span className="">Don't have and account </span>
          <Link to="/register" className="">
            SignUp
          </Link>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
