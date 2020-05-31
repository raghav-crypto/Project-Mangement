import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { createProject } from "../../actions/project";
import { setAlert } from "../../actions/alert";

const CreateProject = ({ project, createProject, setAlert }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    title: "",
    description: "",
  });
  const { projectName, title, description } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    createProject({ projectName, title, description });
    setAlert("Project Created", "success");
  };
  if (project.project !== null) {
    return <Redirect to="/dashboard" />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container login z-depth-2">
      <div className="row">
        <form className="col s12" onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Project Name"
                name="projectName"
                type="text"
                className="validate"
                required
                value={projectName}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Title"
                value={title}
                name="title"
                type="text"
                className="validate"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    name="description"
                    placeholder="Write About Your Project..."
                    value={description}
                    onChange={(e) => onChange(e)}
                    className="materialize-textarea"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn waves-effect waves-teal">
            Submit
          </button>
        </form>
      </div>
      <Link
        style={{ marginLeft: "6px" }}
        to="/dashboard"
        type="submit"
        className="btn"
      >
        Go Back
      </Link>
    </div>
  );
};

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  project: state.project,
});
export default connect(mapStateToProps, { createProject, setAlert })(
  CreateProject
);
