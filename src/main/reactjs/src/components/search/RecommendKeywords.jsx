import React from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Button} from "@nextui-org/react";
import recommendKeyword from './WeatherCategoryKeywords.json'
import {dailyWeatherState} from "../../recoil/hooks/UseWeatherData";
import {useRecoilValue} from "recoil";
import Cloudy from "../../assets/theme/default/Cloudy";
import Sunny from "../../assets/theme/default/Sunny";
import Rain from "../../assets/theme/default/Rain";
import Snowy from "../../assets/theme/default/Snowy";

const RecommendKeywords = ({setInputValue, handleSearch}) => {

    // const dailyWeather = useRecoilValue(dailyWeatherState).data;

    const {loading: loading, data: data} = useRecoilValue(dailyWeatherState);

    const todayWeather = dailyWeather?.weather;
    const todayWeatherKeywords = recommendKeyword.find(item => item.weather === todayWeather);

    const handelButtonClick = (e) => {
        handleSearch(e.target.value);
        setInputValue(e.target.value);
    }

    const renderWeatherIcon = () => {
        switch (todayWeather) {
            case "맑음":
                return <Sunny fill='#DBDDE8' stroke='#DBDDE8' width='8em'/>
            case "비":
                return <Rain fill='#DBDDE8' stroke='#DBDDE8' width='8em'/>
            case "비/눈":
                return <Snowy fill='#DBDDE8' stroke='#DBDDE8' width='8em'/>
            case "눈":
                return <Snowy fill='#DBDDE8' stroke='#DBDDE8' width='8em'/>
            case "소나기":
                return <Rain fill='#DBDDE8' stroke='#DBDDE8' width='8em'/>
            case "흐림":
                return <Cloudy fill='#DBDDE8' stroke='#DBDDE8' width='8em'/>
            default:
                return <div>없음</div>
        }
    }

    if(loading) {
        return <div> 로딩중
        </div>
    }

    return (

        <section>
            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward className="mr-2"/>
                    <p className="text-md font-bold">추천 키워드</p>
                </div>
            </div>

            <div style={styles.message} className="flex flex-col">
                <div>{renderWeatherIcon(todayWeather)}</div>
                <div className="flex flex-col">
                    <div> {dailyWeather?.area} 날씨는 {todayWeather}!</div>
                    <div>오늘 이런 클럽은 어떠세요?</div>
                </div>
            </div>

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
                                    onClick={(e) => handelButtonClick(e)}
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
        padding     : '10px',
    },
    slideSections: {
        display   : 'flex',
        alignItems: 'flex-end',
        overflow  : 'hidden',
        position  : 'relative',
        cursor    : 'pointer',
    },
    message      : {
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        // height        : '100%',
        color : 'gray',
        width : '100%',
        margin: '5% 0 5% 0',
    }
}


