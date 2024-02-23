import React from 'react';
import sample from "../../assets/svg/sample.svg";

const SampleFrame = () => {
    return (
        <div>
            <br/>  <br/>
            <div style={styles.container}>
                <div style={styles.mainContent}>
                    <div style={styles.temperature}>21°C</div>
                    <div style={styles.area}>서울 강남구</div>
                    <div style={styles.weatherDescription}>Rainy</div>
                </div>
                <div style={styles.footer}>
                </div>
            </div>
            <img src={sample} alt="Weather Icon" style={styles.image} />
        </div>
    );
};

export default SampleFrame;


const styles = {
    container: {
        //backgroundColor: '#F5F5F5',
        borderRadius: '40px',
        border : '10px solid black',
        //boxShadow: '0 4px 8px rgba(0, 0.8, 0, 0.1)',
        overflow: 'hidden',
        color: '#333',
        width : '85%',
        maxWidth: '600px',
        height: '65vh',
        margin: 'auto',
    },
    mainContent: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        textAlign: 'left',
        width: '100%',
        position: 'relative',
    },
    temperature: {
        padding: '20px',
        fontSize: '48px',
        fontWeight: 'bold',
        margin: '2%px 0',
        textAlign: 'right',
        alignSelf: 'flex-end',
    },
    area: {
        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-end',
    },
    weatherDescription: {
        fontSize: '18px',
        textAlign: 'left',
        alignSelf: 'flex-end',
    },
    footer: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        left: '-25%',
        top: '50%',
        transform: 'translateY(-50%)',
        overflow: 'hidden',
    },
};
