import React, {useEffect} from 'react';
import { useState } from 'react';
import './widget.css';

export default function Widget() {
    const [isActive, setIsActive] = useState(false);

    const handleToggleClick = () => {
        setIsActive(!isActive);
    };

    // 페이지 로드 시에 실행되는 함수
    useEffect(() => {
        handleToggleClick(); // 초기 상태를 설정하기 위해 handleToggleClick 함수를 실행
    }, []);

    return (
        <>
            <div className={`widget ${isActive ? 'active' : ''}`}>
                <div className="menu">
                    <div className="toggle" onClick={handleToggleClick}>
                        <i></i>
                        <i></i>
                    </div>
                    <ul className="list">
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
//
// const styles = {
//     title:{
//         fontSize:20,
//         fontWeight:900,
//     }
// }
