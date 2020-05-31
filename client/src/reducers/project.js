import {
  CREATE_PROJECT,
  PROJECT_ERROR,
  GET_CURRENT_PROJECT,
  GET_USER_PROJECTS,
  DELETE_PROJECT,
  CLEAR_PROJECT,
  UPDATE_PROJECT,
  CLEAR_CURRENT_PROJECT,
  EXPLORE_PROJECTS,
  CREATE_TODO,
  TODO_ERROR,
  GET_TODO,
  CLEAR_TODO,
  PROJECT_LOADED
} from "../actions/Types";

const initialState = {
  project: null,
  projects: [],
  loading: true,
  error: {},
  currentProject: [],
  exploreProjects: [],
  todos: [],
  projectLoaded: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: payload,
        loading: false,
      };
    case EXPLORE_PROJECTS:
      return {
        ...state,
        exploreProjects: payload,
        loading: false
      }
    case CREATE_PROJECT:
    case UPDATE_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        project: null,
      };
    case CLEAR_PROJECT:
      return {
        ...state,
        loading: false,
        project: null,
      };
    case PROJECT_LOADED:
      return {
        ...state,
        projectLoaded: true
      }
    case GET_USER_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: [],
        loading: false
      }
    case CREATE_TODO:
      return {
        ...state,
        todos: payload,
        loading: false
      }
    case GET_TODO:
      return {
        ...state,
        todos: payload,
        loading: false
      }
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
      case CLEAR_TODO:
        return {
          ...state,
          todos: [],
          loading: false  
        }
    default:
      return state;
  }
}
