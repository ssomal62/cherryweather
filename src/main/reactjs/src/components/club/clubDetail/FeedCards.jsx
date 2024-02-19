import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Chip, Image} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";

const FeedCards = () => {
    return (
        <>
            <Swiper
                spaceBetween={20}
                slidesPerView={'auto'}
                //centeredSlides={true}
                //centeredSlidesBounds={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {
                    list.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Card className="py-4" radius="none" style={{width:'70%'}}>
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <Chip color='primary' size='sm' variant='dot' className="text-tiny uppercase font-bold">2024-02-19</Chip>
                                    <h4 className="font-bold text-large">{item.title}</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://nextui.org/images/hero-card-complete.jpeg"
                                        width={'100%'}
                                    />
                                </CardBody>
                                <CardFooter>
                                    <small className="text-default-500">{item.price}</small>
                                </CardFooter>
                            </Card>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
};

export default FeedCards;

const list = [
    {
        title: "🌈맑은날 모임은 즐겁다",
        img  : "/images/fruit-1.jpeg",
        price: "다같이 산책하며 팔짝 뛰어놀았다. 내일은 비가 온단다.",
    },
    {
        title: "☃️눈오는 날도 즐겁다",
        img  : "/images/fruit-2.jpeg",
        price: "나만그런가",
    },
    {
        title: "Raspberry",
        img  : "/images/fruit-3.jpeg",
        price: "글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.",
    },
    {
        title: "Lemon",
        img  : "/images/fruit-4.jpeg",
        price: "$5.30",
    },
    {
        title: "Avocado",
        img  : "/images/fruit-5.jpeg",
        price: "$15.70",
    },
    {
        title: "Lemon 2",
        img  : "/images/fruit-6.jpeg",
        price: "$8.00",
    },
    {
        title: "Banana",
        img  : "/images/fruit-7.jpeg",
        price: "$7.50",
    },
    {
        title: "Watermelon",
        img  : "/images/fruit-8.jpeg",
        price: "$12.20",
    },
];
