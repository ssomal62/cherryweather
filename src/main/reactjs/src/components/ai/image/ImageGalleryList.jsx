import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import styled from "styled-components"
import {buketURLState, useFetchImageList} from "../../../recoil/hooks/UseFetchImageList";
import ImageListItem from "./ImageListItem";
import {deleteState} from "../../../recoil/hooks/UseDeleteImage";
import ImageGalleryItem from "./ImageGalleryItem";
// import ImageGalleryItem_test from "./ImageGalleryItem_test";

const ImageGalleryList = () => {

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
        <div style={{marginBottom:"5em"}}>
            <ImageGalleryItem />
            {/*<ImageGalleryItem_test />*/}
        </div>
    );
};

export default ImageGalleryList;

const CardListItemWrapper = styled.div`
    margin-bottom: 25px;
`;
