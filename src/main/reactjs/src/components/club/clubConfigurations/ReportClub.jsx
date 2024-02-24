import React from 'react';
import {IoIosArrowForward} from "react-icons/io";

const ReportClub = () => {
    return (
        <div className="flex items-center justify-between" style={styles.font}>
            <div className="flex items-center">
                <p>신고하기</p>
            </div>
            <div className="flex items-end">
                <IoIosArrowForward/>
            </div>
        </div>
    );
};

export default ReportClub;

const styles = {
    font: {
        color : 'black', margin: '5% 0 5% 2%',
        cursor: 'pointer',
    },
}
