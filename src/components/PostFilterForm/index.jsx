import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRef } from "react";

PostFilterForm.propTypes = {
    //ở thằng cha truyền xuống
  onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
  onSubmit: null,
};

function PostFilterForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState(""); //mặc định là rỗng
  const typingTimeoutRef = useRef(null); //lưu tạm

  //mỗi lần thay đổi cập nhật lại state
  function handleSearchTermChange(event) {
    const value = event.target.value;
    setSearchTerm(value);
    //nếu thằng cha không truyền xuống thì k làm gì cả
    if(!onSubmit) return;
    //kiểm tra lần trước nó có setTimeout chưa
    //VD: ở đây là đợi 300ms, nếu đang đợi 200ms mà người dùng nhập tiếp thì clearTimeOut đó đi
    //và đợi bắt đầu ở thời gian mới.
    if(typingTimeoutRef.current) {
        //nếu có thì clear
        clearTimeout(typingTimeoutRef.current);
    };
    console.log(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
        const formValues = {
            searchTerm: value,
        }
        
        onSubmit(formValues); 
    }, 300);


  }

  return (
    <form>              
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
    </form>
  );
}

export default PostFilterForm;
