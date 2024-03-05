import React from 'react';
import {Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Image} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from "swiper";

const FeedCards = ({clubFeedData}) => {
    SwiperCore.use([Navigation]);
    const formatDateAndWeekday = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
        const weekday = weekdays[date.getDay()];
        return `${month}월 ${day}일 / ${weekday}요일`;
    }

    const fileUrl = (type, code) => {
        if (code === null) {
            return
        }
        const baseUrl = `https://kr.object.ncloudstorage.com/cherry-weather`;
        const paths = {
            'user': {path: "user-profile", extension: ""},
            'feed': {path: "feed-files", extension: '.jpg'},
            'club': {path: "club-profile", extension: ".jpg"}
        };
        const typePath = paths[type] || {path: "default", extension: ""};
        const {path, extension} = typePath;
        return `${baseUrl}/${path}/${code}${extension}`;
    }
    return (
        <>
            <Swiper
                modules={[Navigation]}
                slidesPerView={'auto'}
                navigation={true}
            >
                {clubFeedData.map((data, index) => (
                        <SwiperSlide key={index} style={{display: 'flex', justifyContent:'center'}}>
                            <Card className="py-4 m-4" radius="sm" style={{width: '90%'}}>
                                <CardHeader className="pb-2 pt-2 px-4 flex flex-col">
                                    <div className="flex justify-start">
                                        <Chip color='primary' size='sm' variant='dot' className="text-tiny">
                                            {formatDateAndWeekday(data.feed.createdAt)}
                                        </Chip>
                                    </div>
                                    <div className="flex flex-row justify-start items-center">
                                        <Avatar isBordered radius="full" size="md" src={fileUrl('user', data.feed.userProfile)}/>
                                        <h4 className="text-small font-semibold leading-none text-default-600 ml-2">{data.feed.userName}</h4>
                                    </div>
                                </CardHeader>
                                {
                                    data.feed.feedCode ? (
                                            <div>
                                                <CardBody className='flex flex-row items-center'>
                                                    <Image
                                                        alt="Card background"
                                                        className="object-cover rounded-xl mr-2"
                                                        src={fileUrl('feed', data.feed.feedCode)}
                                                        style={{width: '100px', height:'100px'}}
                                                    />
                                                    <small
                                                        className="text-default-500 block overflow-hidden"
                                                        style={{
                                                            display        : '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 5,
                                                            overflow       : 'hidden',
                                                            textOverflow   : 'ellipsis',
                                                        }}
                                                    >
                                                        {data.feed.content}
                                                    </small>
                                                </CardBody>
                                            </div>
                                        ) :
                                        (
                                            <CardFooter className="h-[100px] overflow-hidden">
                                                <small
                                                    className="text-default-500 block overflow-hidden"
                                                    style={{
                                                        display        : '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 5,
                                                        overflow       : 'hidden',
                                                        textOverflow   : 'ellipsis',
                                                    }}
                                                >
                                                    {data.feed.content}
                                                </small>
                                            </CardFooter>)
                                }
                            </Card>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </>
    )
        ;
};

export default FeedCards;

const list = [
    {
        title  : "🌈맑은날 모임은 즐겁다",
        img    : "/images/fruit-1.jpeg",
        content: "다같이 산책하며 팔짝 뛰어놀았다. 내일은 비가 온단다.",
    },
    {
        title  : "✅언젠가 그날이 오면...제목을 길게 쓰면 어떻게 될까????",
        img    : "/images/fruit-2.jpeg",
        content: "글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.",
    },
    {
        title  : "🎮빨리 수료하고 게임하고싶다 정말로!!",
        img    : "/images/fruit-3.jpeg",
        content: "글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.글이 많이 길어지면 어떻게 될랑가 너무 궁금했다. 그래서 글을 더 작성해보았다.",
    },
    {
        title  : "☃️눈오는 날도 즐겁다",
        img    : "/images/fruit-4.jpeg",
        content: "뒹굴거려보자 뒹굴뒹굴",
    }
];
