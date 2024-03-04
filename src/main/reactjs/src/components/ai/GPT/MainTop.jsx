import React from 'react';
import {Card, Button, CardFooter, Image} from '@nextui-org/react';
import './css/mainTop.css';
import {useNavigate} from "react-router-dom"; // Make sure to create this CSS file in your project


const MainTop =  React.memo(({ index })  => {

    const serviceDescriptions = [
        {
            title: "옷차림 추천",
            description: ["전문 스타일리스트(?) 체리와의 대화로,","오늘의 옷차림을 골라보세요"]
        },
        {
            title: "찜 불러오기",
            description: ["내가 선택한 옷을 보관하는 나만의 비밀 옷장이에요!"]
        },
        {
            title: "갤러리 둘러보기",
            description: ["체리가 자신있게 추천하는","Made in Cherry의 여러 스타일!"]
        },
        {
            title: "랜덤 옷차림 추천",
            description: ["랜덤으로 생성되는 옷차림이에요.","어떤옷이 나올지 누구도 몰라요!"]
        }
    ];

    // index를 사용하여 현재 설명을 가져옵니다.
    const currentDescription = serviceDescriptions[index];

    if (!currentDescription) return null; // 또는 다른 UI를 표시

    return (
        <div className="main-top-container ">
                {/*<Card key={index} isHoverable isPressable className="w-[40%] m-1 hover:shadow-lg transition" >*/}

                        <h3 className="service-title w-full">{currentDescription.title}</h3>
                        {/*<p className="service-description w-full">*/}
                        {/*    {currentDescription.description.map((line, lineIndex) => (*/}
                        {/*    <React.Fragment key={lineIndex}>*/}
                        {/*        <span>{line}</span>*/}
                        {/*        {lineIndex < currentDescription.description.length - 1 && <br />}*/}
                        {/*    </React.Fragment>*/}
                        {/*))}</p>*/}

                {/*</Card>*/}
        </div>
    );
});

export default MainTop;