import React from "react";
import '../GPT/css/GalleryItem.css';
import {useNavigate} from "react-router-dom"; // CSS 파일 경로 확인 필요



// Card 컴포넌트 정의
// ImageGalleryItem 컴포넌트 정의
const ImageGalleryItem = ({ title, copy, button, navigateTo }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(navigateTo); // 동적으로 경로 설정
    };

    return (
        <div className="card">
            <div className="content">
                <h2 className="title">{title}</h2>
                <p className="copy">{copy}</p>
                <button className="btn" onClick={handleNavigate}>{button}</button>
            </div>
        </div>
    );
};
export default ImageGalleryItem;