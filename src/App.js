import React, { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Dợ xỉn cưng à!'},
    {id: 2, title: 'Anh yêu dợ xỉn cưng nhiều lắm nhen'},
    {id: 3, title: 'Chụt chụt chụt'}
  ]);
  //con truyền lên
  function handleTodoClick(todo) {
    //trả về vị trí
    const index = todoList.findIndex(x => x.id === todo.id)
    //nếu không tìm thấy thì không làm gì cả
    if(index < 0) return;
    //nếu tìm thấy, lấy listTodo hiện tại
    //lưu ý là phải clone ra state mới chứ không nên chỉnh sửa trên state cũ
    const newTodoList = [...todoList];
    //xóa 1 phần tử
    newTodoList.splice(index, 1);
    //set lại todo mới
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React Hook! Todo List</h1>
      {/* truyền qua todos bên kia là cái mảng todoList */}
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
