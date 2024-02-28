import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image} from "@nextui-org/react";
import {GoHeart, GoHeartFill} from "react-icons/go";
import {WiCloud, WiDaySunny, WiDust, WiNightAltSnowWind, WiRain, WiSandstorm} from "react-icons/wi";
import {GrFormNext} from "react-icons/gr";
import {useLocation, useNavigate} from "react-router-dom";
import LoginVerificationModal from "../../../utils/LoginVerificationModal";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../../recoil/LoginAtom";
import {useLikeClub} from "../../../recoil/hooks/UseLikeApi";
import {CgMoreVertical} from "react-icons/cg";
import TimeLabel from "./TimeLabel";

const FeedCard = ({data, useParam}) => {

    const isLogin = useRecoilValue(IsLoginAtom);
    const feed = data.feed;
    const club = data.club;

    const [isLiked, setIsLiked] = useState(feed.liked);
    const [countLike, setCountLike] = useState(feed.countLiked);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const {toggleLikeClub} = useLikeClub();

    const handlePageChange = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        navigate(`/club-details/${club.clubId}`, {state: {from: location.pathname}});
    }

    useEffect(() => {
        const scrollY = sessionStorage.getItem('scrollPosition');
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY, 10));
        }
    }, []);

    const handleLikeClick = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
        setIsLiked(!isLiked);
        setCountLike((currentCount) => isLiked ? currentCount - 1 : currentCount + 1);
        // toggleLikeClub({type: "Feed", targetId: feed.feedId});
    };

    const fileUrl = (type, code) => {
        if (code === null) {
            return
        }
        const baseUrl = `https://kr.object.ncloudstorage.com/cherry-weather`;
        const paths = {
            'user': {path: "user-profile", extension: ".jpg"},
            'feed': {path: "feed-files", extension: ''},
            'club': {path: "club-profile", extension: ".jpg"}
        };
        const typePath = paths[type] || {path: "default", extension: ""};
        const {path, extension} = typePath;
        return `${baseUrl}/${path}/${code}${extension}`;
    }

    const renderWeatherIcon = (feedWeather) => {
        switch (feedWeather) {
            case '흐림':
                return <WiCloud/>;
            case '비"':
                return <WiRain/>;
            case '안개"':
                return <WiDust/>;
            case '눈"':
                return <WiNightAltSnowWind/>;
            case '바람"':
                return <WiSandstorm/>;
            case '맑음':
            default:
                <WiDaySunny/>;
        }
    };

    const renderFeedCard = (isPublic) => {

        if (isPublic || (!isPublic && useParam)) {
            return (
                <Card className="max-w-[600px]" fullWidth>
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar isBordered radius="full" size="md" src={fileUrl('user', feed.userProfile)}/>
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{feed.userName}</h4>
                                <div
                                    className="flex items-center justify-row text-small tracking-tight text-default-400">
                                    <TimeLabel createdAt={feed.createAt}/>  / {renderWeatherIcon(feed.weather)}  {feed.weather}
                                </div>
                            </div>
                        </div>
                        <div className="justify-center items-center">
                            <Button
                                className={isLiked ? "bg-transparent text-foreground border-default-200" : ""}
                                isIconOnly
                                variant="light"
                                color="primary"
                                onPress={handleLikeClick}
                                startContent={
                                    isLiked ?
                                        <GoHeartFill style={{width: '20px', height: '20px'}}/>
                                        :
                                        <GoHeart style={{width: '20px', height: '20px'}}/>

                                }
                            />
                            {useParam &&
                                <Button
                                    isIconOnly
                                    variant='light'
                                    color="primary"
                                    endContent={<CgMoreVertical
                                        style={{width: '20px', height: '20px', color: 'gray'}}/>}/>
                            }
                        </div>
                    </CardHeader>
                    <CardBody className="pl-5 pr-5 text-small text-default-400">
                        <p>{feed.content}</p>
                    </CardBody>
                    <CardBody>
                        {
                            feed.feedCode &&
                            <Image alt="" src={fileUrl('feed', feed.feedCode)}/>
                        }
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">{countLike}</p>
                            <p className=" text-default-400 text-small">좋아요</p>
                        </div>
                    </CardBody>
                    {!useParam ? (
                        <>
                            <Divider/>
                            <CardFooter className="gap-2 bg-blend-color gray bg-background/70">
                                <div className="flex justify-between items-center w-full">
                                    <div className="justify-start">
                                        <Image alt="" src={fileUrl('club', club.code)}
                                               style={{height: '60px', width: '60px'}}/>
                                    </div>
                                    <div className="ml-5 flex-col justify-center">
                                        <p className="font-bold text-large text-default-800">{club.name}</p>
                                        <p className="text-default-400 text-small">{club.description}</p>
                                    </div>
                                    <div className="ml-auto mr-3 justify-center">
                                        <Button size="sm" radius="full"
                                                variant="ghost" color="default"
                                                className="text-default-400"
                                                onClick={handlePageChange}
                                                endContent={<GrFormNext/>}>
                                            클럽 가기
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </>
                    ) : null}
                </Card>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            {renderFeedCard(feed.isPublic)}
            <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    );
};

export default FeedCard;


