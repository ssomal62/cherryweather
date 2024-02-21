import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Chip, Image} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from "swiper";
const FeedCards = () => {

    SwiperCore.use([Navigation]);

    return (
        <>
            <Swiper
                modules={[Navigation]}
                slidesPerView={'auto'}
                navigation={true}
            >
                {
                    list.map((item, index) => (
                        <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card className="py-4" radius="sm" style={{width:'70%'}}>
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <Chip color='primary' size='sm' variant='dot' className="text-tiny uppercase font-bold">2024-02-19</Chip>
                                    <h4 className="font-bold text-large mt-4"
                                        style={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%'}}
                                    >{item.title}</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://nextui.org/images/hero-card-complete.jpeg"
                                        width={'100%'}
                                    />
                                </CardBody>
                                <CardFooter className="h-[100px] overflow-hidden">
                                    <small className="text-default-500 block overflow-hidden"
                                           style={{
                                               display: '-webkit-box',
                                               WebkitBoxOrient: 'vertical',
                                               WebkitLineClamp: 5,
                                               overflow: 'hidden',
                                               textOverflow: 'ellipsis',
                                           }}
                                    >
                                        {item.content}
                                    </small>
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
        content: "다같이 산책하며 팔짝 뛰어놀았다. 내일은 비가 온단다.",
    },
    {
        title: "✅언젠가 그날이 오면...제목을 길게 쓰면 어떻게 될까????",
        img  : "/images/fruit-2.jpeg",
        content: "글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.",
    },
    {
        title: "🎮빨리 수료하고 게임하고싶다 정말로!!",
        img  : "/images/fruit-3.jpeg",
        content: "글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.",
    },
    {
        title: "☃️눈오는 날도 즐겁다",
        img  : "/images/fruit-4.jpeg",
        content: "뒹굴거려보자 뒹굴뒹굴",
    }
];
