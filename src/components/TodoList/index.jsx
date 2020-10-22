import React from "react";
import PropTypes from "prop-types";

TodoList.propTypes = {
  //nếu không có .isRequired ở sau thì phải khai báo giá trị mặc định
  todos: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
  //nếu ở thằng cha không truyền todo xuống thì lấy giá trị là rỗng
  //và onTodoClick thì null
  todos: [],
  onTodoClick: null,
};

function TodoList(props) {
  const { todos, onTodoClick } = props;

  //nhận vào 1 cái todo
  function handleClick(todo) {
    //vì nó có thể bị null nên phải check trước
    if (onTodoClick) {
      onTodoClick(todo);
    }
  }

  return (
    <ul className="todo-list">
      {todos.map((
        todo //khi nó bị click thì truyền cái todo hiện tại bị click vào
      ) => (
        <li key={todo.id} onClick={() => handleClick(todo)}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
export default TodoList;
