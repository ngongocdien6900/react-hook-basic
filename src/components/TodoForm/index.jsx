import React, { useState } from 'react';
import PropTypes from 'prop-types';


TodoForm.propTypes = {
    //không có require nên ở dưới phải có default
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {

    const { onSubmit } = props;
    //tạo ra state lưu trữ giá trị của ô input
    const [value, setValue] = useState('');

    //cập nhật lại setValue
    function handleValueChange(event) {
        let value = event.target.value;
        setValue(value);
    }
    //khi submit form sẽ reload lại trang
    //nên ở đây sẽ ngăn reload lại trang
    function handleSubmit(event) {
        event.preventDefault();
        //nếu hàm này k có (cha không cho hàm) thì không làm gì cả
        if(!onSubmit) return;
        //nếu có
        const formValue = {
            title: value, 
            //nếu có nhiều field thì ',' rồi viết tiếp bên dưới
        };
        //truyền value lên cho cha 
        onSubmit(formValue);
        //reset value về lại rỗng
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>               
            {/* gán value = value của state => dẫn tới tình trạng lỗi và không nhập được
                , và muốn thay đổi giá trị trong ô input thì phải thay đổi state
                nên sử dụng onChange
            */}
            <input type="text" value={value} onChange={handleValueChange}/>
        </form>
    );
}

export default TodoForm;