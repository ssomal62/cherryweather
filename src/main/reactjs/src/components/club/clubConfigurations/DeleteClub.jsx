import React from 'react';
import {IoIosArrowForward} from "react-icons/io";

const DeleteClub = () => {
    return (
        <div className="flex items-center justify-between" style={styles.font}>
            <div className="flex items-center">
                <p>클럽 삭제</p>
            </div>
            <div className="flex items-end">
                <IoIosArrowForward/>
            </div>
        </div>
    );
};

export default DeleteClub;

const styles = {
    font: {
        color : 'black', margin: '5% 0 5% 2%',
        cursor: 'pointer',
    },
}
