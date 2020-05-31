import axios from "axios";
import {
  CREATE_PROJECT,
  PROJECT_ERROR,
  GET_USER_PROJECTS,
  DELETE_PROJECT,
  CLEAR_PROJECT,
  UPDATE_PROJECT,
  GET_CURRENT_PROJECT,
  CLEAR_CURRENT_PROJECT,
  EXPLORE_PROJECTS,
  CREATE_TODO,
  TODO_ERROR,
  GET_TODO,
  CLEAR_TODO,
  PROJECT_LOADED
} from "./Types";
import { setAlert } from "./alert";

export const createProject = ({ projectName, title, description }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ projectName, title, description });
  try {
    const res = await axios.post("/api/project", body, config);
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });
    dispatch({
      type: CLEAR_PROJECT
    });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getUserProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/project");
    dispatch({
      type: GET_USER_PROJECTS,
      payload: res.data,
    });
    dispatch({
      type: CLEAR_CURRENT_PROJECT,
    });
  } catch (error) {
    console.log(error.message)
  }
};

export const deleteProject = (id) => async (dispatch) => {
  const res = await axios.delete(`api/project/${id}`);
  console.log(res.data);
  dispatch({
    type: DELETE_PROJECT,
    payload: res.data,
  });
  dispatch(setAlert(res.data.msg, "success"));
};

// Update Project
export const updateProject = (
  projectName,
  title,
  description,
  projectId
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ projectName, title, description });
  try {
    const res = await axios.put(`/api/project/${projectId}`, body, config);
    console.log(res.data);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
    dispatch(setAlert("Project Updated Successfully", "success"));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const getCurrentProject = (object) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CURRENT_PROJECT,
      payload: object,
    });
  } catch (error) {
    console.log(error.message);
  }
};
// Get Projects from all user

export const explore = () => async (dispatch) => {
  try {
    const res = await axios.get('api/project/projects')
    dispatch({
      type: EXPLORE_PROJECTS,
      payload: res.data
    })
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
}
export const project_loaded = () => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_LOADED
    })
  } catch (error) {
    console.log(error.message)
  }
}

// Create Todo
export const createTodo = ( todo, completed, projectId ) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ todo, completed });
  try {
    const res = await axios.post(`/api/project/todos/${projectId}`, body, config);
    dispatch({
      type: CREATE_TODO,
      payload: res.data.project.todos,
    });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TODO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getTodo = ( projectId ) => async (
  dispatch
) => {
  try {
    dispatch({
      type: CLEAR_TODO
    })
    const res = await axios.get(`/api/project/todos/${projectId}`);
    dispatch({
      type: GET_TODO,
      payload: res.data
    });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TODO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};