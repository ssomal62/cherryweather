import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {buketURLState, useFetchImageList} from "../../../recoil/hooks/UseFetchImageList";
import {deleteState} from "../../../recoil/hooks/UseDeleteImage";
import ImageGalleryItem from "./ImageGalleryItem";

const cards = [
    { title: 'Casual', copy: 'Casual style aims for comfortable and natural yet stylish looks. It often involves using casual materials to create a prioritizing comfort. ', button: 'show Book', navigateTo: '/casual' },
    { title: 'Modern Chic', copy: 'Modern chic style pursues contemporary and sophisticated looks. It prefers clean and sleek designs with a minimalist approach.', button: 'show Book', navigateTo: '/modern' },
    { title: 'Street & Sporty', copy: 'Street & sporty style signifies urban and active looks. Combining streetwear and sporty elements, it creates unique and vibrant outfits. ', button: 'show Book', navigateTo: '/sporty' },
    { title: 'Classic & Elegance', copy: 'Classic &  elegance style aims for elegant and luxurious looks. By using classic designs and premium materials, it exudes a timeless and refined atmosphere. ', button: 'show Book', navigateTo: '/classic' }
];

const ImageGalleryList = () => {

    return (
        <div style={{marginBottom: "5em"}}>
            {/*<ImageGalleryItem />*/}
            <main className="page-content">
                {cards.map((card, index) => (
                    <ImageGalleryItem
                        key={index}
                        title={card.title}
                        copy={card.copy}
                        button={card.button}
                        navigateTo={card.navigateTo}
                    />
                ))}
            </main>
        </div>
    );
};

export default ImageGalleryList;

