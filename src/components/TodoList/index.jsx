import React from "react";
import PropTypes from "prop-types";

TodoList.propTypes = {
  //khai báo 2 props
  //nếu không có .isRequired ở sau thì phải khai báo giá trị mặc định
  todos: PropTypes.array, //gõ tắt pta
  onTodoClick: PropTypes.func, //ptf
};

//không có isRequired nên phải khai báo giá trị mặc định nè hicc
TodoList.defaultProps = {
  //nếu ở thằng cha không truyền giá trị xuống thì lấy
  //giá trị khai báo ở dưới đây
  todos: [],
  onTodoClick: null,
};

function TodoList(props) {
  //lấy những cái props thôi nha ^^
  const { todos, onTodoClick } = props;

  //nhiệm vụ của nó là gọi lên thằng cha
  //nhận vào 1 cái todo
  function handleClick(todo) {
    //vì nó có thể bị null nên phải check trước
    if (onTodoClick) {
      //truyền lên thằng App xử lý
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
