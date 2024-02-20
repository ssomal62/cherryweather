import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import styled from "styled-components"
import {buketURLState, useFetchImageList} from "../../../recoil/hooks/UseFetchImageList";
import ImageListItem from "./ImageListItem";
import {deleteState} from "../../../recoil/hooks/UseDeleteImage";

const ImageList = () => {

    const fetchList = useFetchImageList();
    const imageList = useRecoilValue(buketURLState);
    const isDeleted = useRecoilValue(deleteState);

    useEffect(() => {
        fetchList();
        if (isDeleted) {
            fetchList();
        }
    }, [fetchList, isDeleted]);

    return (
        <div>
        {imageList.map((list)=>(
                <CardListItemWrapper key={list.aiImageId}>
                    <ImageListItem list={list} />
                </CardListItemWrapper>
        ))}
        </div>
    );
};

export default ImageList;

const CardListItemWrapper = styled.div`
    margin-bottom: 25px;
`;
