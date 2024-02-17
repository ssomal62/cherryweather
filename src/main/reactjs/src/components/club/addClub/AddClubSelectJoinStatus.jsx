import React, {useEffect, useState} from 'react';
import {Button} from "@nextui-org/react";
import {PiSignInBold} from "react-icons/pi";
import {MdAccessTime} from "react-icons/md";
import NextButton from "./NextButton";

const AddClubSelectJoinStatus = ({onNext, joinApprovalStatus, setJoinApprovalStatus}) => {

    const [isNextDisabled, setIsNextDisabled] = useState(true);

    const [selectedButton, setSelectedButton] = useState('');

    useEffect(() => {
        if(joinApprovalStatus) {
            setSelectedButton(joinApprovalStatus);
            setIsNextDisabled(false);
        }
    }, [joinApprovalStatus]);

    const handleButtonClick = (value) => {
        setSelectedButton(value);
        setJoinApprovalStatus(value);
    };

        return (
            <>
                <span style={{fontSize: 20, fontWeight: 600}} className="mb-[10px]">멤버는 어떻게 가입할 수 있나요?</span>
                <br/><br/>

                <Button
                    startContent={<PiSignInBold style={{...styles.icon}}/>}
                    fullWidth
                    color={selectedButton === 'join' ? 'danger' : 'default'}
                    variant='solid'
                    style={{height: 100}}
                    onClick={() => handleButtonClick('join')}
                >

                    < span style={{fontSize: 20, fontWeight: 600, alignContent: 'start'}}>
                    바로 가입<br/>
                    <span style={{fontSize: 14, fontWeight: 400}}>누구나 클럽에 바로 가입할 수 있어요.</span>
                    </span>
                </Button>

                <br/><br/>

                <Button
                    startContent={<MdAccessTime style={{...styles.icon}}/>}
                    fullWidth
                    color={selectedButton === 'approval' ? 'danger' : 'default'}
                    variant='solid'
                    style={{height: 100}}
                    onClick={() => handleButtonClick('approval')}
                >

                < span style={{fontSize: 20, fontWeight: 600, alignContent: 'start'}}>
                가입 승인<br/>
                <span style={{fontSize: 14, fontWeight: 400}}>클럽 호스트의 승인이 있어야해요.</span>
                </span>
                </Button>


                <br/>
                <br/>
                <br/>
                <NextButton isNextDisabled={isNextDisabled} onNext={onNext}/>
            </>
        )
            ;
    }
;

export default AddClubSelectJoinStatus;

const styles = {
    icon: {
        width      : 40,
        height     : 40,
        marginRight: 10,
    }

}
