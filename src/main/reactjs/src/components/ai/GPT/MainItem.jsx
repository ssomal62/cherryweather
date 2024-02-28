import React from 'react';
import {Card, Button, CardFooter, CardHeader, Image} from '@nextui-org/react';
import { BiCloset } from "react-icons/bi";
import './mainItem.css'; // Make sure to create this CSS file in your project
const MainItem = () => {
    return (
        <>
            <div className="title"> 체리의 소근소근 옷장 </div>
            <div className="max-w-[700px] w-full ">
                <Card isFooterBlurred className="w-full h-[400px]">
                    {/*<CardHeader className="absolute z-10 top-0 flex-col items-start bg-black bg-opacity-40">*/}
                    {/*    <p className="text-tiny text-white uppercase font-bold">AI 오늘의 코디</p>*/}
                    {/*    <h4 className="text-white font-medium text-xl">체리의 소곤소곤 옷장</h4>*/}
                    {/*</CardHeader>*/}
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
                                <p className="text-medium font-medium text-black">나만의 옷장에서 체리와 함께<br/> 오늘의 옷차림을 골라보세요
                                </p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">이동하기</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="title"> 체리의 추천 갤러리</div>
            <div className="max-w-[700px] w-full ">
                <Card isFooterBlurred className="w-full h-[400px]">
                    <CardHeader className="absolute z-10 top-0 flex-col items-start bg-black bg-opacity-40">
                        <p className="text-tiny text-white uppercase font-bold">AI 오늘의 코디</p>
                        <h4 className="text-white font-medium text-xl">체리의 소곤소곤 옷장</h4>
                    </CardHeader>
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
                                <p className="text-medium uppercase font-bold text-black">체리의 소곤소곤 옷장</p>
                                <p className="text-medium font-medium text-black">나만의 옷장에서 체리와 함께<br/> 오늘의 옷차림을 골라보세요
                                </p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">이동하기</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="title"> 랜덤 옷 추천</div>
            <div className="max-w-[700px] w-full ">
                <Card isFooterBlurred className="w-full h-[400px]">
                    <CardHeader className="absolute z-10 top-0 flex-col items-start bg-black bg-opacity-40">
                        <p className="text-tiny text-white uppercase font-bold">AI 오늘의 코디</p>
                        <h4 className="text-white font-medium text-xl">체리의 소곤소곤 옷장</h4>
                    </CardHeader>
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
                                <p className="text-medium uppercase font-bold text-black">체리의 소곤소곤 옷장</p>
                                <p className="text-medium font-medium text-black">나만의 옷장에서 체리와 함께<br/> 오늘의 옷차림을 골라보세요
                                </p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">이동하기</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
export default MainItem;