import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import './SwiperCardSection.css';
import items from './items.json'
import {Button} from "@nextui-org/react";
import {LuCalendarCheck} from "react-icons/lu";
import {GoPeople} from "react-icons/go";

const SwiperCardSection = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const handleSlideClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="game-section">
            <Swiper
                spaceBetween={30}
                slidesPerView={'auto'}  //카드 수
                centeredSlides={true}
                centeredSlidesBounds={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {items.map((item, index) => (
                    <SwiperSlide key={index} className={`item ${activeIndex === index ? 'active' : ''}`}
                                 style={{backgroundImage: `url(${item.imageUrl})`}}
                                 onClick={() => handleSlideClick(index)}>

                        <div className="absolute z-10 item-desc" style={styles.title}>{item.title}</div>
                        <div className="absolute z-10 item-desc" style={styles.content}>

                            <div className="flex items-center gap-2"><LuCalendarCheck/>  {item.date}</div>
                            <div className="flex items-center gap-2"><GoPeople/> {item.personnel}</div>
                        </div>
                        <Button size='md' radius='lg' color='success' variant='bordered'
                                className="absolute flex z-20">참여하기</Button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default SwiperCardSection;

const styles = {
    title: {
        fontWeight   : 600,
        fontSize     : 'large',
        color : 'white',
        marginBottom:100,
    },
    content:{
        color:'white',
        fontSize:'small',
        marginBottom:50,
    }
}
