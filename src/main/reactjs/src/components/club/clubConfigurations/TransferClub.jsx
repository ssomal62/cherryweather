import React from 'react';
import {IoIosArrowForward} from "react-icons/io";

const TransferClub = () => {
    return (
        <div className="flex items-center justify-between" style={styles.font}>
            <div className="flex items-center">
                <p>클럽 양도</p>
            </div>
            <div className="flex items-end">
                <IoIosArrowForward/>
            </div>
        </div>
    );
};

export default TransferClub;

const styles = {
    font: {
        color : 'black', margin: '5% 0 5% 2%',
        cursor: 'pointer',
    },
}
