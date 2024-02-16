import React from 'react';
import {Button} from "@nextui-org/react";

const NextButton = ({isNextDisabled, onNext}) => {
    return (
        <div className="absolute left-0 right-0 top-[90%] justify-center">
            <Button
                isDisabled={isNextDisabled}
                variant='ghost'
                fullWidth
                size='lg'
                color='danger'
                onPress={onNext}
            >
                다음
            </Button>
        </div>
    );
};

export default NextButton;
