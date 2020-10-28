import { useState, useEffect } from 'react';

//vì nó độc lập với component nên viết riêng ra
function formatDate(date) {
    // slice là trích xuất phần từ từ 1 string hoặc 1 mảng. -2 sẽ lấy 2 phần từ cuối cùng
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

//chỉ show giờ thôi nên không cần truyền vào props
function useClock() {

    const [timeString, setTimeString] = useState('');
    //truyền dùng empty depedencies bên chỉ chạy đúng 1 lần
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            //nó nhận vào 1 date object, và return về chuỗi hh:mm:ss
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);

        //khi bị unmount
        return () => {
            //cleanup 
            console.log('Clock cleanup');
            //clear nó đi
            clearInterval(clockInterval)
        }
    }, []);

    return { timeString }   
}

export default useClock;