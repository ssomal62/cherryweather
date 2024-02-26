import React, {useEffect, useMemo, useState} from 'react';
import Layout from "../../common/Layout";
import SearchHeader from "../../components/club/search/SearchHeader";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {Divider} from "@nextui-org/react";
import SearchHistory from "../../components/club/search/SearchHistory";
import RecommendKeywords from "../../components/club/search/RecommendKeywords";
import SearchResult from "../../components/club/search/SearchResult";

const Search = () => {

    const [keywords, setKeywords] = useState([])
    const [searchWord, setSearchWord] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    useEffect(() => {
        const savedKeywords = localStorage.getItem('keywords');
        if (savedKeywords) {
            setKeywords(JSON.parse(savedKeywords));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('keywords', JSON.stringify(keywords));
    }, [keywords]);


    const onRemove = (delIndex) => {
        setKeywords(keywords.filter((item, index) => index !== delIndex));
    }

    const onRemoveAll = () => {
        setKeywords([]);
    }

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() !== '') {
            setKeywords(prevKeywords => {
                const filterKeywords = prevKeywords.filter(keyword => keyword!== searchTerm);
                return [searchTerm, ...filterKeywords];
            });
            setSearchWord(searchTerm);
            setSearchTriggered(true);
        } else {
            setSearchTriggered(false);
        }
    };

    const requestData = useMemo(() => ({
        status: "PUBLIC",
        keyword: searchWord,
    }), [searchWord]);

    const renderContent = useMemo(() => {
        if (searchTriggered && searchWord.trim() !== '') {
            return <SearchResult requestData={requestData} />;
        } else {
            return (
                <>
                    <SearchHistory keywords={keywords} onRemove={onRemove} onRemoveAll={onRemoveAll} />
                    <Divider />
                    <RecommendKeywords handleSearch={handleSearch}/>
                </>
            );
        }
    }, [searchTriggered, searchWord, keywords, requestData]);

    return (
        <Layout useHeader={false} containerMargin="0" containerPadding="0">
            <AnimationRightInWrapper>
                <SearchHeader
                    handleSearch={handleSearch}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                />
                    <br/>

                {renderContent}

            </AnimationRightInWrapper>
        </Layout>
    );
};

export default Search;
