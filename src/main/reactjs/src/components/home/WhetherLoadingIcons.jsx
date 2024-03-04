import React from 'react';
import styles from './WhetherLoadingIcons.module.css';

// Sun Shower Icon
const SunShowerIcon = () => (
    <div className={`${styles.icon} ${styles['sun-shower']}`}>
        <div className={styles.cloud}></div>
        <div className={styles.sun}>
            <div className={styles.rays}></div>
        </div>
        <div className={styles.rain}></div>
    </div>
);

// Thunder Storm Icon
const ThunderStormIcon = () => (
    <div className={`${styles.icon} ${styles['thunder-storm']}`}>
        <div className={styles.cloud}></div>
        <div className={styles.lightning}>
            <div className={styles.bolt}></div>
            <div className={styles.bolt}></div>
        </div>
    </div>
);

// Cloudy Icon
const CloudyIcon = () => (
    <div className={`${styles.icon} ${styles.cloudy}`}>
        <div className={styles.cloud}></div>
        <div className={styles.cloud}></div>
    </div>
);

// Flurries Icon
const FlurriesIcon = () => (
    <div className={`${styles.icon} ${styles.flurries}`}>
        <div className={styles.cloud}></div>
        <div className={styles.snow}>
            <div className={styles.flake}></div>
            <div className={styles.flake}></div>
        </div>
    </div>
);

// Sunny Icon
const SunnyIcon = () => (
    <div className={`${styles.icon} ${styles.sunny}`}>
        <div className={styles.sun}>
            <div className={styles.rays}></div>
        </div>
    </div>
);

// Rainy Icon
const RainyIcon = () => (
    <div className={`${styles.icon} ${styles.rainy}`}>
        <div className={styles.cloud}></div>
        <div className={styles.rain}></div>
    </div>
);

// WeatherLoadingIcon Function to render specific weather icon
const WeatherLoadingIcon = ({type}) => {
    switch (type) {
        case 'sun-shower':
            return <SunShowerIcon />;
        case 'thunder-storm':
            return <ThunderStormIcon />;
        case 'cloudy':
            return <CloudyIcon />;
        case 'flurries':
            return <FlurriesIcon />;
        case 'sunny':
            return <SunnyIcon />;
        case 'rainy':
            return <RainyIcon />;
        default:
            return <div>Icon not found</div>;
    }
};

export {
    WeatherLoadingIcon,
    SunShowerIcon,
    ThunderStormIcon,
    CloudyIcon,
    FlurriesIcon,
    SunnyIcon,
    RainyIcon
};
