import React, {useEffect, useState} from "react";
import {Button, Card, CardBody} from "@nextui-org/react";
import {
    WiCloudy,
    WiDaySunny,
    WiDayWindy,
    WiFog,
    WiLightning,
    WiNightSnowThunderstorm,
    WiRain,
    WiShowers,
    WiSnow,
    WiThunderstorm
} from 'react-icons/wi';

export default function WeatherRadio({weather, setWeather}) {

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setSelected(weather);
    }, [weather]);

    const handleSelect = (value) => {
        setSelected(selected === value ? null : value);
        setWeather(value)
    };

    const whetherItem = [
        {icon: <WiDaySunny style={styles.icon}/>, value: "맑음"},
        {icon: <WiCloudy style={styles.icon}/>, value: "흐림"},
        {icon: <WiRain style={styles.icon}/>, value: "비"},
        {icon: <WiFog style={styles.icon}/>, value: "안개"},
        {icon: <WiThunderstorm style={styles.icon}/>, value: "천둥"},
        {icon: <WiLightning style={styles.icon}/>, value: "번개"},
        {icon: <WiShowers style={styles.icon}/>, value: "소나기"},
        {icon: <WiSnow style={styles.icon}/>, value: "눈"},
        {icon: <WiDayWindy style={styles.icon}/>, value: "선선"},
        {icon: <WiNightSnowThunderstorm style={styles.icon}/>, value: "눈폭풍"},
    ];

    return (
        <Card style={{boxShadow: 'none', borderRadius: '20px', border: '1px solid #E4E4E7'}}>
            <CardBody>
                <div className="flex flex-row flex-wrap justify-between">
                    {whetherItem.map((item, index) => (
                        <React.Fragment key={index}>
                            <Button
                                isIconOnly
                                onClick={() => handleSelect(item.value)}
                                color="danger"
                                variant={selected === item.value ? "solid" : "light"}
                                value={item.value}
                                startContent={item.icon}
                                className="ml-2"
                            />
                            {/*{((index + 1) % 5 === 0) && <div style={{width: '100%'}}><br/></div>}*/}
                        </React.Fragment>
                    ))}
                </div>
            </CardBody>
        </Card>
    );

}

const styles = {
    icon: {
        width : 30,
        height: 30,
    }
}
