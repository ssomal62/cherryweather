import React from 'react';
import sample from "../../assets/svg/sample.svg";

const SampleFrame = () => {
    return (
        <div style={styles.block}>
            <div style={styles.container}>
                <div style={styles.mainContent}>
                    <div style={styles.box}> </div>
                    <div style={styles.temperature}>21°C</div>
                    <div style={styles.area}>서울 강남구</div>
                    <div style={styles.weatherDescription}>Rainy</div>
                </div>
                <div style={styles.footer}>
                </div>
            </div>
            <img src={sample} alt="Weather Icon" style={styles.image}/>
        </div>
    );
};

export default SampleFrame;


const styles = {
    box               : {
        backgroundColor: "black",
        width          : '25%',
        borderRadius: 30,
        height         : '3vh',
        position       : 'relative',
        display:'flex',
        transform: 'translate(-25%, 70%)',
        zIndex   : 20,
        marginLeft: 'auto',
    },
    block             : {
        marginTop: 60,
        maxWidth: '600px',
        position: 'relative',
        overflow: 'hidden',
    },
    container         : {
        //backgroundColor: '#F5F5F5',
        borderRadius: '40px',
        border      : '10px solid black',
        //boxShadow: '0 4px 8px rgba(0, 0.8, 0, 0.1)',
        overflow: 'hidden',
        color   : '#333',
        width   : '75%',
        height  : '65vh',
        margin  : 'auto',
    },
    mainContent       : {
        padding      : '20px',
        display      : 'flex',
        flexDirection: 'column',
        alignSelf    : 'flex-end',
        textAlign    : 'left',
        width        : '100%',
        position     : 'relative',
    },
    temperature       : {
        padding   : '20px',
        fontSize  : '48px',
        fontWeight: 'bold',
        margin    : '2%px 0',
        textAlign : 'right',
        alignSelf : 'flex-end',
    },
    area              : {
        fontSize  : '30px',
        fontWeight: 'bold',
        textAlign : 'left',
        alignSelf : 'flex-end',
    },
    weatherDescription: {
        fontSize : '18px',
        textAlign: 'left',
        alignSelf: 'flex-end',
    },
    footer            : {
        padding       : '20px',
        display       : 'flex',
        justifyContent: 'space-between'
    },
    image             : {
        width    : 'auto',
        height   : 'auto',
        left     : '50%',
        top      : '50%',
        position : 'relative',
        transform: 'translate(-70%, -90%)',
        overflow : 'hidden',
        zIndex   : 20,
    },
};
