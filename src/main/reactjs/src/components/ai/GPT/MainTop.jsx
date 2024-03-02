import React from 'react';
import {Card, Button, CardFooter, Image} from '@nextui-org/react';
import './css/mainTop.css';
import {useNavigate} from "react-router-dom"; // Make sure to create this CSS file in your project


const MainTop =  React.memo(({ index })  => {

    const serviceDescriptions = [
        {
            title: "체리의 소곤소곤 옷장",
            description: ["매일 아침, 무엇을 입을지 고민되시나요?","체리가 여러분의 스타일을 분석해 개인 맞춤형 패션을 제안해 드려요. 오늘의 코디를 체리와 함께 결정해보세요!"]
        },
        {
            title: "체리의 비밀 옷장",
            description: ["꼼꼼히 고른 옷차림, 어디에 저장해두셨나요?","체리의 비밀 옷장에서는 여러분의 모든 스타일을 안전하게 보관해드려요. 언제든지 꺼내보고 싶은 그 옷, 체리가 기억해 드릴게요!"]
        },
        {
            title: "체리의 드레스룸",
            description: ["다양한 스타일이 궁금하시거나 새로운 영감이 필요하신가요?","그렇다면 체리의 드레스룸을 방문하세요. 각종 패션 아이템과 스타일을 한눈에 볼 수 있어요. 오늘의 스타일을 찾아보세요!"]
        },
        {
            title: "체리의 꿈꾸는 옷장",
            description: ["꿈꾸는 옷장에서는 어떤 옷이 튀어나올지 아무도 몰라요.","뜬금 없는 옷이 나올 수 있지만 어쩌면 보물 같은 옷이 나올지도 모르는걸요. 즉석에서 추천 옷차림을 보여줘요!"]
        }
    ];

    // index를 사용하여 현재 설명을 가져옵니다.
    const currentDescription = serviceDescriptions[index];

    if (!currentDescription) return null; // 또는 다른 UI를 표시

    return (
        <div className="main-top-container">
                <Card key={index} isHoverable isPressable className="w-[360px] m-1 hover:shadow-lg transition" >
                    <Card>
                        <h3 className="service-title">{currentDescription.title}</h3>
                        <p className="service-description">
                            {currentDescription.description.map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                                <span>{line}</span>
                                {lineIndex < currentDescription.description.length - 1 && <br />}
                            </React.Fragment>
                        ))}</p>
                    </Card>
                </Card>
        </div>
    );
});

export default MainTop;