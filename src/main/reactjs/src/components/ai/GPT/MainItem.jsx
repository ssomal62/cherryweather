import React from 'react';
import {Card, Button, CardFooter, CardHeader, Image} from '@nextui-org/react';
import { BiCloset } from "react-icons/bi";
import './mainItem.css';
import {useNavigate} from "react-router-dom"; // Make sure to create this CSS file in your project
const MainItem = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="title"> 소곤소곤 옷장</div>
            <div className="max-w-[700px] w-full ">
                <Card isFooterBlurred className="w-full h-[400px]">
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://kr.object.ncloudstorage.com/cherry-ai-image/youngsh92%40naver.com/42161429843982215070f513e1b-12d2-4e34-9c38-f4730713ccb5.png"
                    />
                    <CardFooter className="absolute bg-white/80 bottom-0 z-10  border-default-600 ">
                        <div className="flex flex-grow gap-2 items-center">
                            <BiCloset size="40px"/>
                            <div className="flex flex-col">
                                <p className="text-medium uppercase font-bold text-black">체리의 소곤소곤 옷장</p>
                                <p className="text-medium font-medium text-black">전문 스타일리스트(?) 체리와 함께<br/> 오늘의 옷차림을
                                    골라보세요
                                </p>
                            </div>
                        </div>
                        <Button radius="full" size="sm" onClick={() => navigate('/gpt')}>이동하기</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="title"> 비밀 옷장</div>
            <div className="max-w-[700px] w-full ">
                <Card isFooterBlurred className="w-full h-[400px]">
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://kr.object.ncloudstorage.com/cherry-ai-image/youngsh92%40naver.com/54619020071927277513d1fcd13-99fb-41e6-ac4f-7e3477010d92.png"
                    />
                    <CardFooter className="absolute bg-white/80 bottom-0 z-10  border-default-600 ">
                        <div className="flex flex-grow gap-2 items-center">
                            <BiCloset size="40px"/>
                            <div className="flex flex-col">
                                <p className="text-medium uppercase font-bold text-black">체리의 비밀 옷장</p>
                                <p className="text-medium font-medium text-black">내가 선택한 옷을 보관하는<br/> 비밀 옷장이에요!
                                </p>
                            </div>
                        </div>
                        <Button radius="full" size="sm" onClick={() => navigate('/imageList')}>이동하기</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="title"> 야심찬 전시실</div>
            <div className="max-w-[700px] w-full ">
                <Card isFooterBlurred className="w-full h-[400px]">
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://kr.object.ncloudstorage.com/cherry-ai-image/youngsh92%40naver.com/54619020071927277513d1fcd13-99fb-41e6-ac4f-7e3477010d92.png"
                    />
                    <CardFooter className="absolute bg-white/80 bottom-0 z-10  border-default-600 ">
                        <div className="flex flex-grow gap-2 items-center">
                            <BiCloset size="40px"/>
                            <div className="flex flex-col">
                                <p className="text-medium uppercase font-bold text-black">체리의 야심찬 전시실</p>
                                <p className="text-medium font-medium text-black">체리가 자신있게 추천하는 <br/> Made in Cherry의 여러 스타일..!
                                </p>
                            </div>
                        </div>
                        <Button radius="full" size="sm" onClick={() => navigate('/imageList')}>이동하기</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="title"> 꿈꾸는 옷장</div>
            <div className="max-w-[700px] w-full ">
                <Card isFooterBlurred className="w-full h-[400px]">
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://kr.object.ncloudstorage.com/cherry-ai-image/youngsh92%40naver.com/350302226123496676675c2cdca-9eb6-4f14-836e-34df3e976e8a.png"
                    />
                    <CardFooter className="absolute bg-white/80 bottom-0 z-10  border-default-600 ">
                        <div className="flex flex-grow gap-2 items-center">
                            <BiCloset size="40px"/>
                            <div className="flex flex-col">
                                <p className="text-medium uppercase font-bold text-black">체리의 꿈꾸는 옷장</p>
                                <p className="text-medium font-medium text-black">랜덤으로 생성되는 옷차림이에요.<br/> 어떤옷이 나올지 체리도
                                    몰라요!
                                </p>
                            </div>
                        </div>
                        <Button radius="full" size="sm" onClick={() => navigate('/image')}>이동하기</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
export default MainItem;