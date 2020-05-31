import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "../layouts/Spinner";
import { explore } from "../../actions/project";

const AllUserProjects = ({
  project: { exploreProjects, loading }
}) => {
  useEffect(() => {
    explore()
  }, [explore])
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="container">
        <h3>Project List</h3>
        <div className="row">
          <div className="col">
            {!loading &&
              exploreProjects.map((projects) => (
                <div
                  className="card exploreCards col m6 s12"
                  key={projects._id}
                >
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                      {projects.project.title}
                      <i className="material-icons right">more_vert</i>
                    </span>
                    <p>
                      <a>by {projects.user.name}</a>
                    </p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      Description<i className="material-icons right">close</i>
                    </span>
                    <p>{projects.project.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

AllUserProjects.propTypes = {
  project: PropTypes.object.isRequired,
  explore: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  project: state.project,
});
export default connect(mapStateToProps,{explore})(AllUserProjects);
