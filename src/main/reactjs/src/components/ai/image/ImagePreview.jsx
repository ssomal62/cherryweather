import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import styled from "styled-components"
import {imageURLState, useFetchImage} from "../../../recoil/hooks/UseFetchImage";
import GeneratedImage from "./GeneratedImage";
import {Spinner} from "@nextui-org/react";

const ImagePreview = () => {
    const [isActive, setIsActive] = useState(false);
    const fetchURL = useFetchImage(); // 초기값을 불러옴. 현재는 공백상태
    const image = useRecoilValue(imageURLState); //imageURLState에 저장된 key값을 imgae에 저장한다. 맨 처음에는 공백이다.
    const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터 가져오는 동안 로딩 상태 활성화
            await fetchURL();
            setIsLoading(false); // 데이터 가져온 후 로딩 상태 비활성화
        };

        fetchData();
    }, [fetchURL]);

    return (
        <CenteredContainer>

            {isLoading ? (
                <Spinner size="lg" label="이미지 생성중" color="danger" labelColor="danger" />
            ) : (
                <CardListItemWrapper>
                    <GeneratedImage image={image} />
                </CardListItemWrapper>
            )}
        </CenteredContainer>
    );
};

export default ImagePreview;

const CenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 84vh; /* 화면의 높이를 기준으로 세로 중앙 정렬 */
`;

const CardListItemWrapper = styled.div`
    margin-bottom: 25px;
`;
