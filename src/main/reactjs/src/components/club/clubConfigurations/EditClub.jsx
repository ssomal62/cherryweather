import React from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const EditClub = ({clubDetail}) => {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between" style={styles.font}
             onClick={() => navigate(`/club-add/${clubDetail.clubId}`)}>
            <div className="flex items-center">
                <p>클럽 수정하기</p>
            </div>
            <div className="flex items-end">
                <IoIosArrowForward/>
            </div>
        </div>
    );
};

export default EditClub;

const styles = {
    font: {
        color : 'black', margin: '5% 0 5% 2%',
        cursor: 'pointer',
    },
}
