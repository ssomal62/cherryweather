import React, {useState} from 'react';
import {Button, Card, CardBody, CardFooter, Chip, Image} from "@nextui-org/react";
import {TiLocation} from "react-icons/ti";
import {IoChatbubbleEllipses} from "react-icons/io5";
import {BsFillPeopleFill} from "react-icons/bs";
import {HeartIcon} from "./HeartIcon";
import {HeartFill, useSaveImageState, UseSaveState} from "../../../recoil/hooks/UseSaveState";
import {useRecoilValue} from "recoil";
import {Spinner} from "@nextui-org/react";



const GeneratedImage = ({image}) => {

    const { toggleSaveImage } = useSaveImageState(); // useSaveImageState 훅을 호출하여 toggleSaveImage 함수를 가져옵니다.
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const handleClick = () => {
        const newWindow = window.open(image, '_blank');
        if (newWindow) {
            newWindow.opener = null; // 새 창의 opener를 null로 설정하여 보안 상의 이슈를 방지합니다.
        }
    };
    const handleSaveClick = async () => {
        setIsLoading(true); // 저장하기 버튼 클릭 시 로딩 상태 활성화
        await toggleSaveImage(image);
        setIsLoading(false); // 저장 완료 후 로딩 상태 비활성화
    };

    // 수정: saveImageStatus 대신 isSaved 값 직접 사용
    const isSaved = useRecoilValue(HeartFill);
    console.log("isSaved="+isSaved);
    return (

        <Card
            isFooterBlurred
            radius="lg"
            className="border-none"
            onClick={handleClick} // 클릭 이벤트 처리
        >

            <div className="relative w-full h-[600px]" onClick={handleClick}>
                <div className="absolute z-10 w-full h-full from-slate-800 bg-gradient-to-b to-transparent " ></div>

                <Image
                    removeWrapper
                    isZoomed
                    alt="Woman listing to music"
                    className="z-0 w-full object-cover h-[600px] object-middle"
                    src={image}
                    width={600}

                />
            </div>
            {isLoading && ( // isLoading이 true일 때만 스피너 표시
                <>
                    <br/>
                    <Spinner size="lg" label="저장중" color="danger" labelColor="danger" className="z-100" />
                    <br/>
                    <br/>
                </>
            )}
            <CardBody className="absolute z-20 top-1 flex-col items-start" onClick={handleClick}>
                <div className="flex justify-between w-full" onClick={handleClick}>
                    <div className="flex items-start" onClick={handleClick}>
                        <Chip color="primary" variant="solid" size='sm'
                        >오늘의 추천 옷차림</Chip>&nbsp;&nbsp;
                    </div>
                    <div className="flex items-end">
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            // onPress={() => setLiked((v) => !v)}
                        >
                            <HeartIcon
                                style={{color: 'white'}}
                                className={isSaved ? "[&>path]:stroke-transparent" : ""}
                                fill={isSaved ? "red" : "none"}
                            />
                        </Button>
                    </div>
                </div>
                <p className="text-tiny text-white/60 uppercase" >Cherry's Pick!</p>
                <div style={{fontWeight:600}} className="text-white text-opacity-90 font-medium text-2xl drop-shadow shadow-black">
                     프레피 스타일
                </div>
            </CardBody>

            <CardFooter
                className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} >

                <TiLocation style={{...styles.icon}}/>
                <p className="text-tiny text-black">오늘의 온도</p>

                <BsFillPeopleFill style={{...styles.icon}}/>
                <p className="text-tiny text-black">최고 기온 13도 / 최저 기온 6도</p>

                <IoChatbubbleEllipses style={{...styles.icon}}/>
                <p className="text-tiny text-black">맑음</p>

                <Button
                    className="text-tiny text-success font-semibold"
                    variant="light"
                    color="success"
                    radius="lg"
                    size="sm"
                    onClick={handleSaveClick}
                    disabled={isLoading || isSaved} // 로딩 중이거나 이미 저장된 경우 버튼 비활성화
                >
                    {isLoading ? "저장 중..." : (isSaved ? "저장 완료" : "저장하기")}
                </Button>
            </CardFooter>
        </Card>
    );
};

const styles = {
    icon: {
        color: 'white',
    },
};

export default GeneratedImage;
