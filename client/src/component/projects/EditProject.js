import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateProject } from "../../actions/project";

const EditProject = ({
  project: { currentProject, loading },
  updateProject,
  match,
}) => {

  const [formData, setFormData] = useState({
    projectName: "",
    title: "",
    description: "",
  });
  const { projectName, title, description } = formData;
  useEffect(() => {
    setTimeout(() => {
      setFormData({
        projectName:
          loading || !currentProject[0].project.projectName
            ? ""
            : currentProject[0].project.projectName,
        description:
          loading || !currentProject[0].project.description
            ? ""
            : currentProject[0].project.description,
        title:
          loading || !currentProject[0].project.title
            ? ""
            : currentProject[0].project.title,
      });
    }, 1000);
  }, []);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    const projectId = match.params.id
    e.preventDefault();
    console.log(projectId)
    updateProject(projectName, title, description, projectId);
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
                className="valprojectIdate"
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
                className="valprojectIdate"
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
EditProject.propTypes = {
  project: PropTypes.object.isRequired,
  updateProject: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { updateProject })(EditProject);
