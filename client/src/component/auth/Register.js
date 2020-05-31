import React, { useState } from "react";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect, Link } from 'react-router-dom'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not Match", "danger");
    } else {
      register({ email, name, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <div className="container register z-depth-2">
      <div className="row">
        <form className="col s12" onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="input-field col s12">
              <input
              placeholder='Email'
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
              placeholder='Name'
                value={name}
                name="name"
                type="text"
                className="active validate"
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="input-field col s12">
              <input
              placeholder='Password'
                value={password}
                name="password"
                type="password"
                className="validate"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="input-field col s12">
              <input
              placeholder='Confirm Password'
                value={password2}
                name="password2"
                type="password"
                className="validate"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
        <div className='row'>
        <button type="submit" className="btn waves-effect waves-teal">
          <i class="material-icons right">send</i>
            Submit
          </button>
        </div>
        <span className="">Already Have An Account </span>
          <Link to="/login" className="">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};
Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
