import React, {useEffect, useMemo, useState} from 'react';
import Layout from "../../common/Layout";
import SearchHeader from "../../components/search/SearchHeader";
import {Divider} from "@nextui-org/react";
import SearchHistory from "../../components/search/SearchHistory";
import RecommendKeywords from "../../components/search/RecommendKeywords";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {searchClubListState} from "../../recoil/hooks/UseClubApi";
import SearchResultRefresh from "../../components/search/SearchResultRefresh";
import SearchResult from "../../components/search/SearchResult";

const Search = () => {

    const [keywords, setKeywords] = useState([])
    const [searchWord, setSearchWord] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const searchClubList = useRecoilValue(searchClubListState);
    const setSearchClubLit = useSetRecoilState(searchClubListState);


    useEffect(() => {
        const savedSearchResult = sessionStorage.getItem('searchResult');
        if (savedSearchResult) {
            const inputValue = JSON.parse(savedSearchResult);
            setInputValue(inputValue);
        }
    }, []);

    useEffect(() => {
        const savedSearchTriggered = sessionStorage.getItem('searchTriggered');
        if (savedSearchTriggered) {
            setSearchTriggered(savedSearchTriggered === 'true');
        }
    }, []);

    function handleBack() {
        navigate(from);
    }

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
        setSearchClubLit([]);
        if (searchTerm.trim() !== '') {
            setKeywords(prevKeywords => {
                const filterKeywords = prevKeywords.filter(keyword => keyword!== searchTerm);
                return [searchTerm, ...filterKeywords];
            });
            setSearchWord(searchTerm);
            setSearchTriggered(true);
            sessionStorage.setItem('searchResult', JSON.stringify(searchTerm));
            sessionStorage.setItem('searchTriggered', 'true');
        } else {
            setSearchTriggered(false);
            sessionStorage.setItem('searchTriggered', 'false');
        }
    };

    const requestData = useMemo(() => ({
        status: "PUBLIC",
        keyword: searchWord,
    }), [searchWord]);

    const renderContent = useMemo(() => {
        if (searchClubList.length > 0 && searchTriggered)  {
            return <SearchResult/>;
        } else if (searchTriggered && searchWord.trim() !== '') {
            return <SearchResultRefresh requestData={requestData} />;
        } else  {
            return (
                <>
                    <SearchHistory
                        keywords={keywords}
                        onRemove={onRemove}
                        onRemoveAll={onRemoveAll}
                        setInputValue={setInputValue}
                        handleSearch={handleSearch}
                        setSearchTriggered={setSearchTriggered}
                    />
                    <Divider />
                    <RecommendKeywords
                        setInputValue={setInputValue}
                        handleSearch={handleSearch}
                        setSearchTriggered={setSearchTriggered}
                    />
                </>
            );
        }
    }, [searchTriggered, searchClubList, searchWord, keywords, requestData, inputValue]);

    return (
        <Layout useHeader={false} containerMargin="0" containerPadding="0">
                <SearchHeader
                    handleBack={handleBack}
                    handleSearch={handleSearch}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    setSearchTriggered={setSearchTriggered}
                />
                <br/>
                {renderContent}
        </Layout>
    );
};

export default Search;
