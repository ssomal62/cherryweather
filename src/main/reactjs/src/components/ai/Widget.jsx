import React, {useEffect} from 'react';
import { useState } from 'react';
import './widget.css';
import {useNavigate} from "react-router-dom";
import { FcMms } from "react-icons/fc";
import { FcGallery } from "react-icons/fc";
import { FcSms } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";

export default function Widget() {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
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
                        <li onClick={() => navigate('/image')}><FcMms style={{...styles.icon}}/></li>
                        <li onClick={() => navigate('/image')}><FcEditImage style={{...styles.icon}}/></li>
                        <li onClick={() => navigate('/imageList')}><FcGallery style={{...styles.icon}}/></li>
                        <li onClick={() => navigate('/gpt')}><FcSms style={{...styles.icon}}/></li>
                    </ul>
                </div>
            </div>
        </>
    );
}


const styles = {
    title: {
        fontSize: 20,
        fontWeight: 900,
    },
    icon: {
        width: 24,
        height: 24,
        marginTop: 8,
        marginLeft: 8,

    }
}
