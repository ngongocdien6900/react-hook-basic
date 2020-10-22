import React, { useState } from 'react';
import './ColorBox.scss';

// ColorBox.propTypes = {
    
// };
//vì hàm này độc lập với component hiện tại nên viết ở ngoài
function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
                    //lấy phần nguyên, Math.random return số từ 0 -> 1 (luôn nhỏ hơn 1)
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {

    //đầu tiên khai báo state, sử dụng use state hook
    //và color này sẽ bind vào trong background ở dưới
    //và sử dụng callback function để set màu lần đầu tiên, vì để ngoài sẽ dư thừa.
    const [color, setColor] = useState(() => {
        //lấy từ localStorage lên, với key là mình đặt ở dưới, và nếu không có giá trị thì lấy mặc định là deeppink
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        return initColor;
    });
    //hàm này có sử dụng setColor nên viết trong component
    function handleBoxClick() {
        //get random color -> color
        const newColor = getRandomColor();
        setColor(newColor);
        //lưu vào localStorage
        localStorage.setItem('box_color', newColor);
    }

    return (
        <div 
            className="color-box" 
            style={{ backgroundColor: color }}
            //khi click vào box thì sẽ sử lí ở trên
            onClick= {handleBoxClick}
        >
        </div> 
    );
}

export default ColorBox;