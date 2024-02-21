import React from 'react';
import {Button} from "@nextui-org/react";
import {IoIosAddCircleOutline} from "react-icons/io";

const FinishButton = ({isNextDisabled, onSave}) => {
    return (
        <div>
            <Button
                isDisabled={isNextDisabled}
                variant='ghost'
                startContent={<IoIosAddCircleOutline style={styles.icon}/>}
                size='lg'
                color='danger'
                fullWidth
                onPress={onSave}
            >
                클럽 만들기
            </Button>
        </div>
    );
};

export default FinishButton;


const styles = {
    icon : {
        width:24,
        height:24,
    }
}
