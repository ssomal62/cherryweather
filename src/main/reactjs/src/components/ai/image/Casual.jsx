import React from "react";
import '../GPT/css/Casual.css';
import {useLocation, useNavigate} from "react-router-dom";
import ImageGalleryHeader from "./ImageGalleryHeader";
import Layout from "../../../common/Layout";

const cards = new Array(12).fill(null).map((_, index) => ({
    navigateTo: `/image${index + 1}` // 예시 경로
}));

// Card 컴포넌트에서는 이미지만 표시합니다.
const Card = ({navigateTo}) => {
    return (
        <div className="card-casual" style={{backgroundImage: `url(${navigateTo})`}}></div>
    );
};


const Casual = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/gallery';
    const handleBack = () => {
        navigate(from);
    }
    const handleNavigate = (navigateTo) => {

        navigate(navigateTo);

    };
    return (
        <Layout useFooter={true} useHeader={false}>
            <ImageGalleryHeader  handleBack={handleBack}/>
            <main className="page-content-casual">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        navigateTo={card.navigateTo} // 이 부분은 실제 이미지 URL로 대체되어야 합니다.
                    />
                ))}
            </main>
        </Layout>
    );
};

export default Casual;