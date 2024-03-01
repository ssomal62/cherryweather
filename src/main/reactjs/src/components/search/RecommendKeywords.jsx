import React from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Button} from "@nextui-org/react";
import recommendKeyword from './WeatherCategoryKeywords.json'

const RecommendKeywords = ({setInputValue, handleSearch}) => {

    const todayWeather = "눈";
    const todayWeatherKeywords = recommendKeyword.find(item => item.weather === todayWeather);

    const handelButtonClick = (e) => {
        handleSearch(e.target.value);
        setInputValue(e.target.value);
    }

    return (

        <section>
            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward className="mr-2"/>
                    <p className="text-md font-bold">추천 키워드</p>
                </div>
            </div>

            <div style={styles.message}> 오늘 날씨는 {todayWeather} ! 이런 클럽은 어떠세요?</div>
            <div style={{
                display       : 'flex',
                justifyContent: 'center',
                flexWrap      : 'wrap',
            }}>

                {
                    todayWeatherKeywords?.recommendKeywords.map((keyword, index) => (
                        <React.Fragment key={index}>
                            <div style={{margin: '0px 10px 0 0'}}>
                                <Button
                                    radius="full"
                                    color="success"
                                    variant="flat"
                                    value={keyword.value}
                                    onClick={(e)=>handelButtonClick(e)}
                                >
                                    {keyword.display}
                                </Button>
                            </div>
                            {((index + 1) % 3 === 0) && <div style={{width: '100%'}}><br/></div>}
                        </React.Fragment>
                    ))
                }

            </div>
        </section>
    );
};

export default RecommendKeywords;

const styles = {
    font         : {
        color       : 'black',
        marginBottom: '5%',
        padding     : '20px',
    },
    slideSections: {
        display   : 'flex',
        alignItems: 'flex-end',
        overflow  : 'hidden',
        position  : 'relative',
        cursor    : 'pointer',
    },
    message: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        margin: '10% 0 20% 0',
    }
}


