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
                <a
                    className="dribbble"
                    href="https://dribbble.com/shots/7197834-Menu-Interaction-Concept"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png"
                        alt=""
                    />
                </a>
            </div>
        </>
    );
}

const styles = {
    title:{
        fontSize:20,
        fontWeight:900,
    }
}
