import React, {useState} from 'react';
import {Button, Card, CardHeader, CardBody, CardFooter, Chip, Image} from "@nextui-org/react";
import {TiLocation} from "react-icons/ti";
import {IoChatbubbleEllipses} from "react-icons/io5";
import {BsFillPeopleFill} from "react-icons/bs";
import {HeartIcon} from "./HeartIcon";
import {HeartFill, useSaveImageState, UseSaveState} from "../../../recoil/hooks/UseSaveState";
import {useRecoilValue} from "recoil";
import {Spinner} from "@nextui-org/react";



const ImageListItem = ({list}) => {

    const { toggleSaveImage } = useSaveImageState(); // useSaveImageState 훅을 호출하여 toggleSaveImage 함수를 가져옵니다.
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const handleClick = () => {
        const newWindow = window.open(list, '_blank');
        if (newWindow) {
            newWindow.opener = null; // 새 창의 opener를 null로 설정하여 보안 상의 이슈를 방지합니다.
        }
    };
    const handleSaveClick = async () => {
        setIsLoading(true); // 저장하기 버튼 클릭 시 로딩 상태 활성화
        await toggleSaveImage(list);
        setIsLoading(false); // 저장 완료 후 로딩 상태 비활성화
    };

    // 수정: saveImageStatus 대신 isSaved 값 직접 사용
    const isSaved = useRecoilValue(HeartFill);
    console.log("isSaved="+isSaved);
    return (
        // <div className="max-w-[600px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        <>
            <Card isFooterBlurred className="w-full h-[350px] col-span-12 sm:col-span-5">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-black/65 uppercase font-bold">Cherry's match</p>
                    {/*<h4 className="text-black font-medium text-2xl">{list.createdAt}</h4>*/}
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-450 h-450 scale-95 -translate-y-6 object-cover"
                    // src={list.bucketURL}
                    src={list.bucketURL}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">{list.createdAt}</p>
                        <p className="text-tiny text-black/65 uppercase font-bold">Cherry's match</p>
                        {/*<p className="text-black text-tiny">날씨 정보</p>*/}
                    </div>
                    <Button className="text-tiny" color="danger" radius="full" size="sm">
                        {isLoading ? "저장 중..." : (isSaved ? "삭제 완료" : "삭제")}
                    </Button>
                </CardFooter>
            </Card>
        </>




      // </div>
    );
};

const styles = {
    icon: {
        color: 'white',
    },
};

export default ImageListItem;