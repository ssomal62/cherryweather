import React, {useEffect} from 'react';
import {Card, CardBody} from "@nextui-org/react";
import {WeatherLoadingIcon} from "./WhetherLoadingIcons";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";

const LoadingCard = ({number, setNumber}) => {

    useEffect(() => {
       setNumber(Math.floor(Math.random() * 6) + 1)
    }, []);

    const renderLoading = () => {
        switch (number) {
            case 1:
                return (<>
                    <Card radius="lg" className="mb-5">
                        <CardBody>
                            <WeatherLoadingIcon type="rainy"/>
                        </CardBody>
                    </Card>
                    <p style={styles.font}>시간 여행을 통해</p>
                    <p style={styles.font}>내일의 날씨를 엿보는 중...</p>
                </>)
            case 2:
                return (<>
                    <Card radius="lg" className="mb-5">
                        <CardBody>
                            <WeatherLoadingIcon type="sun-shower"/>
                        </CardBody>
                    </Card>
                    <p style={styles.font}>감성 분석을 통해</p>
                    <p style={styles.font}>오늘의 날씨 기분을 측정 중...</p>
                </>)
            case 3:
                return (<>
                    <Card radius="lg" className="mb-5">
                        <CardBody>
                            <WeatherLoadingIcon type="thunder-storm"/>
                        </CardBody>
                    </Card>
                    <p style={styles.font}>기상청과 핸드셰이크를 시도하는 중...</p>
                </>)
            case 4:
                return (<>
                    <Card radius="lg" className="mb-5">
                        <CardBody>
                            <WeatherLoadingIcon type="cloudy"/>
                        </CardBody>
                    </Card>
                    <p style={styles.font}>클라우드서버에서 </p>
                    <p style={styles.font}>구름 데이터 다운 중... </p>
                </>)
            case 5:
                return (<>
                    <Card radius="lg" className="mb-5 h-[200px]">
                        <CardBody>
                            <WeatherLoadingIcon type="flurries"/>
                        </CardBody>
                    </Card>
                    <p style={styles.font}>오늘 날씨 아이콘 제작 중...</p>
                </>)
            case 6:
                return (<>
                        <Card radius="lg" className="mb-5">
                            <CardBody>
                                <WeatherLoadingIcon type="sunny"/>
                            </CardBody>
                        </Card>
                        <div className='flex flex-row'>
                            <p style={styles.font}>인공지능 체리🍒</p>
                            {/*<p style={styles.cherry}></p>*/}
                            <p style={styles.font}>를</p>
                        </div>
                        <p style={styles.font}>깨우는 중...</p>
                    </>
                )
            default:
                return (<>
                    </>
                )
        }
    }
    return (
        <AnimationRightInWrapper className="w-2/3 mx-auto">
            <div className="flex flex-col items-center justify-center">
                {renderLoading()}
            </div>
        </AnimationRightInWrapper>
    );
};

export default LoadingCard;

const styles = {
    font  : {
        color     : '#8A99B5',
        fontFamily: 'Dongle',
        fontSize  : '1.8em',
    },
    cherry: {
        color     : '#ED145F',
        fontFamily: 'Dongle',
        fontSize  : '1.8em',
        marginLeft: 7,
    }
}
