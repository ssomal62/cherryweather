import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import styled from "styled-components"
import {Spinner} from "@nextui-org/react";
import {buketURLState, useFetchImageList} from "../../../recoil/hooks/UseFetchImageList";
import ImageListItem from "./ImageListItem";

const ImageList = () => {

    const fetchURL = useFetchImageList();
    const imageList = useRecoilValue(buketURLState);
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
        <div>
        {imageList.map((list)=>(
        // <CenteredContainer>
                <CardListItemWrapper key={list.aiImageId}>
                    <ImageListItem list={list} />
                </CardListItemWrapper>
        // </CenteredContainer>
        ))}
        </div>
    );
};

export default ImageList;

// const CenteredContainer = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 84vh; /* 화면의 높이를 기준으로 세로 중앙 정렬 */
// `;

const CardListItemWrapper = styled.div`
    margin-bottom: 25px;
`;
