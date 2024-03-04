import React from "react";
import '../GPT/css/GalleryItem.css'; // CSS 파일 경로 확인 필요

const cards = [
    { title: 'Casual', copy: 'Casual style aims for comfortable and natural yet stylish looks. It often involves using casual materials to create a prioritizing comfort. ', button: 'show Book' },
    { title: 'Modern Chic', copy: 'Modern chic style pursues contemporary and sophisticated looks. It prefers clean and sleek designs with a minimalist approach.', button: 'show Book' },
    { title: 'Street & Sporty', copy: 'Street & sporty style signifies urban and active looks. Combining streetwear and sporty elements, it creates unique and vibrant outfits. ', button: 'show Book' },
    { title: 'Classic & Elegance', copy: 'Classic &  elegance style aims for elegant and luxurious looks. By using classic designs and premium materials, it exudes a timeless and refined atmosphere. ', button: 'show Book' }
];

// Card 컴포넌트 정의
const Card = ({ title, copy, button }) => {
    return (
        <div className="card">
            <div className="content">
                <h2 className="title">{title}</h2>
                <p className="copy">{copy}</p>
                <button className="btn">{button}</button>
            </div>
        </div>
    );
};

const ImageGalleryList = () => {
    return (
        <main className="page-content">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    copy={card.copy}
                    button={card.button}
                />
            ))}
        </main>
    );
};

export default ImageGalleryList;