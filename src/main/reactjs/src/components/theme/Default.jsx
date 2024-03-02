import React from 'react';
import Fog from "../../assets/theme/default/Fog";
import MostlyCloudy from "../../assets/theme/default/MostlyCloudy";
import Night from "../../assets/theme/default/Night";
import Rain from "../../assets/theme/default/Rain";
import Snowy from "../../assets/theme/default/Snowy";
import Sunny from "../../assets/theme/default/Sunny";
import SunnyWithFog from "../../assets/theme/default/SunnyWithFog";
import Thunder from "../../assets/theme/default/Thunder";
import Windy from "../../assets/theme/default/Windy";
import Cloudy from "../../assets/theme/default/Cloudy";

const Default = () => {
    return (
        <div>
            <Fog fill='red' stroke='red' width='5em' height='5em'/>
            <MostlyCloudy/>
            <Night/>
            <Rain/>
            <Snowy/>
            <Sunny/>
            <SunnyWithFog/>
            <Thunder/>
            <Windy/>
            <Cloudy/>
        </div>
    );
};

export default Default;
