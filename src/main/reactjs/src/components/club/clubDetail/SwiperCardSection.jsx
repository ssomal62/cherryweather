import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import items from './items.json'
import {Button} from "@nextui-org/react";
import {LuCalendarCheck} from "react-icons/lu";
import {GoPeople} from "react-icons/go";

const SwiperCardSection = () => {

    return (
        <section className="game-section">

            <Swiper
                spaceBetween={30}
                slidesPerView={'auto'}
                // centeredSlides={true}
                // centeredSlidesBounds={true}
                slidesOffsetBefore={25}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {items.map((item, index) => (

                    <SwiperSlide key={index}
                                 style={{
                                     ...styles.itemStyle,
                                     backgroundImage: `url(${item.imageUrl})`
                                 }}>
                        <div style={styles.gradientLayer}></div>
                            <div className="absolute z-10 item-desc" style={styles.title}>{item.title}</div>
                            <div className="absolute z-10 item-desc" style={styles.content}>
                                <div className="flex items-center gap-2"><LuCalendarCheck/> {item.date}</div>
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
    title    : {
        fontWeight  : 600,
        fontSize    : 'large',
        color       : 'white',
        marginBottom: 100,
    },
    content  : {
        color       : 'white',
        fontSize    : 'small',
        marginBottom: 50,
    },
    itemStyle: {
        width       : '50%',
        padding     : '5%',
        height      : '30vh',
        display     : 'flex',
        alignItems  : 'flex-end',
        background  : '#343434 no-repeat center center / cover',
        borderRadius: '16px',
        overflow    : 'hidden',
        position    : 'relative',
        transition  : 'all 0.4s ease-in-out',
        cursor      : 'pointer',
    },
    gradientLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))',
        zIndex: 2,
    }
}
