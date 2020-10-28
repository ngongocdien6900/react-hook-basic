import React, { useEffect, useState } from 'react';
import './App.scss';
import Pagination from './components/Panination';
import queryString from 'query-string'
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import PostFilterForm from './components/PostFilterForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';
import MagicBox from './components/MagicBox';


function App() {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Dợ xỉn cưng à!'},
    {id: 2, title: 'Anh yêu dợ xỉn cưng nhiều lắm nhen'},
    {id: 3, title: 'Chụt chụt chụt'}
  ]); 

  //tạo state để lưu trữ danh sách post lấy từ server
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '', //search cái title chứa nội dung ở đây
    //nếu sau này có search hoặc sort thì cứ thêm vào sau
  });
  //lấy lần đầu tiên nên dependency rỗng
  useEffect(() => {

    async function fetchPostList() {
      try{            //biến từ object sang chuỗi
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        //đi lấy dữ liệu ở url khai báo
        const response = await fetch(requestUrl);
        const reponseJSON = await response.json();
        // console.log({reponseJSON});

        const {data, pagination} = reponseJSON; //lấy data ở trong đó ra
        //cập nhật dữ liệu
        setPostList(data);
        setPagination(pagination);
      }catch(error) {
        console.log('Failed to featch post list', error.message);
      }
    }
    fetchPostList();
  }, [filters]) //chạy lại mỗi lần filter này thay đổi nên truyền vào filters

  
  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage //set lại page bằng page con truyền lên
    })
  }

  //todo ở đây là do con truyền lên nè
  function handleTodoClick(todo) { 
    //nếu tìm thấy thì trả về vị trí
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
  //lấy value từ thằng con và thêm vào todoList hiện tại
  function handleTodoOnSubmit(formValue) {
    const newTodo = {
      id: todoList.length + 1, 
      //lấy tất cả những field có ở formValue
      ...formValue,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);

  }

  function handleFilterChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1, //reset lại trang về trang 1, tại vì có khi dữ liệu có khi không nhiều
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="app">
      <h1>React Hook! MagicBox</h1>
      <MagicBox />
      {/* nếu showClock = true thì sẽ hiện => render condition */}
      {/* {showClock && <Clock/>} */}
      {/* <BetterClock /> */}
      {/* <button onClick={() => setShowClock(!showClock)}>Hide Clock</button> */}
      {/* khi todoForm này submit sẽ gọi hàm bên trên */}
      {/* <TodoForm onSubmit={handleTodoOnSubmit}/> */}
      {/* truyền qua todos bên kia là cái mảng todoList */}
                                  {/* khi thằng TodoList được click thì gọi hàm này  */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick}/> */}
      {/* <PostFilterForm onSubmit={handleFilterChange}/> */}

      {/* <PostList posts={postList}/>        */}
                    {/* khi user click nút prev hoặc next thì gọi hàm này ở thằng cha */}
      {/* <Pagination pagination={pagination} onPageChange={handlePageChange}/> */}
    </div>
  );
}

export default App;
