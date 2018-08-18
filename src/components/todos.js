import React from "react";
import { connect } from 'react-redux'

const TodoItem = ({ todo, destroyTodo }) => {
  return (
    <div>
      {todo.text}
      <span onClick={destroyTodo}> x </span>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    todo: state.todos[0]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    destroyTodo: () =>
      dispatch({
        type: 'DESTROY_TODO'
      })
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem)