import { useEffect, useRef, useState } from 'react';

function randomColor(currentColor) {
    //lấy phần nguyên, Math.random return số từ 0 -> 1 (luôn nhỏ hơn 1) 
    const COLOR_LIST = ['red', 'green', 'yellow', 'deeppink'];
    //lấy ra vị trí hiện tại
    const currentIndex = COLOR_LIST.indexOf(currentColor);
    let newIndex = currentIndex;
    //nếu 2 thằng bằng nhau thì tiếp tục random thằng mới để không bị trùng nhau    
    while(currentIndex === newIndex) {
        newIndex = Math.trunc(Math.random() * 4);
    }
    console.log(newIndex);
    return COLOR_LIST[newIndex];
}


function useMagicColor() {

    const [color, setColor] = useState('transparent');
    //giống như lưu tạm vào đây
    const colorRef = useRef('transparent');

    useEffect(() => {
        const colorInterval = setInterval(() => {
            console.log("First color: ", color);
            console.log("Change color: ", colorRef.current);
                //Change color every 1 seconds
            const newColor = randomColor(colorRef.current);
            setColor(newColor);
            //mỗi lần có color mới thì set nó vào colorRef
            //Lần tiếp theo sẽ lấy từ colorRef ra 
            //lưu giá trị ở đây để tái sử dụng để thằng ở trên lấy ra
            colorRef.current = newColor;
        }, 1000);

        return () => { 
            clearInterval(colorInterval);
        }
    }, []);

    return color;
    
}

export default useMagicColor;