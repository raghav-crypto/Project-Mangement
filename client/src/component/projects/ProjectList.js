import React, { useEffect } from "react";
import ProjectSummary from "./ProjectSummary";
import { connect } from "react-redux";
import { getUserProjects } from "../../actions/project";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Spinner } from "../layouts/Spinner";
import { project_loaded } from "../../actions/project";

export const ProjectList = ({
  project: { projects, loading, todos, projectLoaded },
  getUserProjects,
}) => {
  useEffect(() => {
    getUserProjects();
  }, [getUserProjects]);

  if (loading && projects.length === 0) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <div className="project-list section">
              {!loading && projects.length !== 0 ? (
                projects.map((project) => (
                  <ProjectSummary
                    key={project._id}
                    id={project._id}
                    user={project.user.name}
                    createdAt={project.date}
                    projectName={project.project.projectName}
                    title={project.project.title}
                    description={project.project.description}
                  />
                ))
              ) : (projects.length === 0) ? (<h1>No Projects</h1>)  : ''
            }
            </div>
          </div>
          <div className="col m6 todos">
            {todos.todos === undefined
              ? ""
              : todos.todos.map((todo) => (
                  <p key={todo._id} className="todo right col m12">
                    {todo.todo}
                  </p>
                ))}
          </div>
        </div>
      </div>
    );
  }
};
ProjectList.propTypes = {
  project: PropTypes.object.isRequired,
  getUserProjects: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
});
export default connect(mapStateToProps, { getUserProjects, project_loaded })(
  ProjectList
);
