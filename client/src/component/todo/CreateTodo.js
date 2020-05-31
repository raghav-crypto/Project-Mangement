import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTodo } from "../../actions/project";
import { getTodo } from "../../actions/project";
import $ from "jquery";

const CreateTodo = ({ createTodo, id, getTodo }) => {
  useEffect(() => {
    getTodo(id)
  }, [getTodo])
  const [formData, setFormData] = useState({
    todo: "",
    completed: false,
  });
  const { todo, completed } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("todo Created");
    createTodo(todo, completed, id);
    getTodo(id)
    setFormData({
      todo: "",
    });
  };
  return (
    <div className="row">
      <form className="col s12" onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="input-field col s6">
            <input
              required
              name="todo"
              placeholder="Add Todo"
              type="text"
              className="validate"
              onChange={(e) => onChange(e)}
              value={todo}
            />
          </div>
          <div className="input-field col s6">
            <button
              onClick={() => {
                getTodo(id);
                $(function () {
                  $('<a name="top"/>').insertBefore($("body").children().eq(0));
                  window.location.hash = "top";
                });
                $(function () {
                  $('<a name="top"/>').insertBefore($("body").children().eq(0));
                  window.location.hash = "";
                });
              }}
              className="btn waves-effect waves-teal"
            >
              Todos
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

CreateTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default connect(null, { createTodo, getTodo })(CreateTodo);
