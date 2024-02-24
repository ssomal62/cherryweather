import React from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const ManageClubMembers = () => {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between" style={styles.font}
             onClick={()=> navigate('/club-members')}>
            <div className="flex items-center">
                <p>클럽 멤버</p>
            </div>
            <div className="flex items-end">
                <IoIosArrowForward/>
            </div>
        </div>
    );
};

const styles = {
    font: {
        color : 'black', margin: '5% 0 5% 2%',
        cursor: 'pointer',
    },
}

export default ManageClubMembers;



