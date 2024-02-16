import React, {useEffect, useState} from 'react';
import {Input} from "@nextui-org/react";
import NextButton from "./NextButton";

const AddClubNameInput = ({onNext, name, setName}) => {

    const [isNextDisabled, setIsNextDisabled] = useState(true);

    useEffect(() => {
        setIsNextDisabled(name.length < 2);
    }, [name]);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setIsNextDisabled(newName.length < 2);
    };

    return (
        <>
            <span style={{fontSize: 20, fontWeight: 600}}> 클럽 이름을 정해보아요.</span>
            <br/><br/>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input type="text" variant='underlined' radius='lg'  placeholder="이름을 작성해주세요 (2자 이상)" value={name} onChange={handleNameChange}
                style={{fontSize:20, fontWeight:600}}
                />
            </div>

            <br/><br/>
            <NextButton isNextDisabled={isNextDisabled} onNext={onNext}/>

        </>
    );
};

export default AddClubNameInput;
