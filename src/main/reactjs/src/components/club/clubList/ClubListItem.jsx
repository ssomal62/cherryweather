import React, {useState} from 'react';
import {Button, Card, CardBody, CardFooter, Chip, Image} from "@nextui-org/react";
import {TiLocation} from "react-icons/ti";
import {IoChatbubbleEllipses} from "react-icons/io5";
import {BsFillPeopleFill} from "react-icons/bs";
import {HeartIcon} from "../../../assets/icon/HeartIcon";
import {useLikeClub} from "../../../recoil/hooks/UseLikedState";
import {useNavigate} from "react-router-dom";


const CardListItem = ({club}) => {

    const navigate = useNavigate();

    const clubProfile = (code) => {
        return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/${code}.jpg?type=f&w=600&h=600&ttype=jpg`
    }

    const [liked, setLiked] = useState(false);
    const {toggleLikeClub} = useLikeClub();

    const handleLikeClick = () => {
        setLiked(!liked);
        toggleLikeClub(club.clubId).then(r => r);
    };

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none"
        >
            <div className="relative w-full h-[200px]">
                <div className="absolute z-10 w-full h-full from-slate-800 bg-gradient-to-b to-transparent "></div>
                <Image
                    removeWrapper
                    alt="Woman listing to music"
                    className="z-0 w-full object-cover h-[200px] object-middle"
                    src={clubProfile(club.code)}
                    width={600}
                />
            </div>
            <CardBody
                className="absolute z-20 top-1 flex-col items-start"
                onClick={() => navigate(`/club-details/${club.clubId}`)}
                style={{cursor:'pointer'}}
            >
                <div className="flex justify-between w-full">
                    <div className="flex items-start">
                        <Chip color="primary" variant="solid" size='sm'
                        >{club.category}</Chip>&nbsp;&nbsp;
                    </div>
                    <div className="flex items-end">
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onPress={() => setLiked((v) => !v)}
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
    );
};

const styles = {
    icon: {
        color: 'white',
    },
};

export default CardListItem;
