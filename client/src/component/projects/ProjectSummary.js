import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteProject } from "../../actions/project";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProject } from "../../actions/project";
import CreateTodo from "../todo/CreateTodo";
import { Spinner } from "../layouts/Spinner";

const ProjectSummary = ({
  project: { projects, loading },
  user,
  title,
  projectName,
  description,
  id,
  deleteProject,
  getCurrentProject
}) => {
  if(loading){
    return (
      <Spinner />
    )
  }
  const filterProjects = () => {
    return projects.filter((project) => project._id === id);
  };
  return (
    <div className="card z-depth-3 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span
          style={{ borderBottom: "1px solid black" }}
          className="card-title"
        >
          {projectName}
        </span>
        <p
          className="right"
          style={{ backgroundColor: "white", color: "#222831" }}
        >
          Posted by {user}
        </p>
        <span className="card-title">{title}</span>
        <p className="grey-text">{description}</p>
        <div className="card-action row">
          <div>
            <p className="col m4 s4">
              <Link
                onClick={() => {
                  getCurrentProject(filterProjects());
                }}
                to={`/edit-project/${id}`}
              >
                Edit Project
              </Link>
            </p>
            <p className="col m4 s4">
              <a
                onClick={() => {
                  deleteProject(id);
                  window.location.reload();
                }}
              >
                Delete Project
              </a>
            </p>
            <p className="col m4 s4">
              <Link to="/read-more">Read More</Link>
            </p>
          </div>
          <CreateTodo id={id} />
        </div>
      </div>
    </div>
  );
};
ProjectSummary.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  getCurrentProject: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  project: state.project,
});
export default connect(mapStateToProps, { deleteProject, getCurrentProject })(
  ProjectSummary
);
