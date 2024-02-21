import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import ClubSearchHeader from "../../components/club/clubSearch/ClubSearchHeader";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {Divider} from "@nextui-org/react";
import SearchHistory from "../../components/club/clubSearch/SearchHistory";
import RecommendKeywords from "../../components/club/clubSearch/RecommendKeywords";

const ClubSearch = () => {

    const [keywords, setKeywords] = useState(() => {
        const savedKeywords = localStorage.getItem('keywords');
        return savedKeywords ? JSON.parse(savedKeywords) : ["파전", "막걸리", "맛초킹"];
    });

    useEffect(() => {
        localStorage.setItem('keywords', JSON.stringify(keywords));
    }, [keywords]);

    const onRemove = (delIndex) => {
        setKeywords(keywords.filter((item, index) => index !== delIndex));
    }

    const onRemoveAll = () => {
        setKeywords([]);
    }

    return (
        <Layout useHeader={false} containerMargin="0" containerPadding="0">
            <AnimationRightInWrapper>
                <ClubSearchHeader setKeywords={setKeywords}/>
                    <br/>
                <SearchHistory
                    keywords={keywords}
                    onRemove={onRemove}
                    onRemoveAll={onRemoveAll}
                />
                <Divider/>
                <RecommendKeywords />
            </AnimationRightInWrapper>
        </Layout>
    );
};

export default ClubSearch;


