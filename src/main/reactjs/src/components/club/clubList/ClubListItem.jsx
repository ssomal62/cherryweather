import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardFooter, Chip, Image} from "@nextui-org/react";
import {TiLocation} from "react-icons/ti";
import {IoChatbubbleEllipses} from "react-icons/io5";
import {BsFillPeopleFill} from "react-icons/bs";
import {HeartIcon} from "../../../assets/icon/HeartIcon";
import {useLikeClub} from "../../../recoil/hooks/UseLikeApi";
import {IsLoginAtom} from "../../../recoil/LoginAtom";
import {useRecoilValue} from "recoil";
import LoginVerificationModal from "../../../utils/LoginVerificationModal";
import categoryDescriptions from "../clubDetail/category.json";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";


const CardListItem = ({club}) => {
    const isLogin = useRecoilValue(IsLoginAtom);

    const clubProfile = (code) => {
        return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/${code ? code : "default"}.jpg?type=f&w=600&h=600&ttype=jpg`
    }

    const [liked, setLiked] = useState(club.liked);
    const {toggleLikeClub} = useLikeClub();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLiked(club.liked);
    }, [club.liked]);

    const handlePageChange = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        navigate(`/club-details/${club.clubId}`, { state: { from: location.pathname } });
    }

    useEffect(() => {
        const scrollY = sessionStorage.getItem('scrollPosition');
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY, 10));
        }
    }, []);

    const handleLikeClick = (event) => {
        event.stopPropagation();
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
        setLiked(!liked);
        toggleLikeClub({type: "CLUB", targetId: club.clubId});
    };

    return (
        <Section onClick={handlePageChange}>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none"
            >
                <div className="relative w-full h-[30dvh]">
                    <div className="absolute z-10 w-full h-full from-slate-800 bg-gradient-to-b to-transparent "></div>
                    <Image
                        removeWrapper
                        alt="Woman listing to music"
                        className="z-0 w-full object-cover h-[30dvh] object-middle"
                        src={clubProfile(club?.code ?? '')}
                        width={600}
                    />
                </div>
                <CardBody
                    className="absolute z-20 top-1 flex-col items-start"
                >
                    <div className="flex justify-between w-full">
                        <div className="flex items-start">
                            <Chip color="primary" variant="solid" size='sm'
                            > {categoryDescriptions[club.category]}</Chip>&nbsp;&nbsp;

                            {club.joinApprovalStatus === "APPROVAL" &&
                                <Chip color="danger" variant="solid" size='sm'
                                > 가입 승인</Chip>
                            }

                        </div>
                        <div className="flex items-end">
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                radius="full"
                                variant="light"
                                onClick={(event) => handleLikeClick(event)}
                            >
                                <HeartIcon
                                    style={{color: 'white'}}
                                    className={liked ? "[&>path]:stroke-transparent" : ""}
                                    fill={liked ? "currentColor" : "none"}
                                />
                            </Button>

                        </div>
                    </div>
                    <p className="text-tiny text-white/60 uppercase">{club.description}</p>
                    <div style={{fontWeight: 600}}
                         className="text-white text-opacity-90 font-medium text-2xl drop-shadow shadow-black">
                        {club.name}
                    </div>
                </CardBody>

                <CardFooter
                    className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_10px)] h-[20%] shadow-small ml-1 z-10">

                    <TiLocation style={{...styles.icon}}/>
                    <p className="text-tiny text-white">{club.activitiesArea}</p>

                    <BsFillPeopleFill style={{...styles.icon}}/>
                    <p className="text-tiny text-white">{club.currentMembers} / {club.maxMembers}</p>

                    <IoChatbubbleEllipses style={{...styles.icon}}/>
                    <p className="text-tiny text-white">30분전</p>
                </CardFooter>
            </Card>
            <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </Section>
    );
};



export default CardListItem;

const Section = styled.div`
cursor: pointer;
max-width: 600px;
width: 100%;
`
const styles = {
    icon: {
        color: 'white',
    },
};
