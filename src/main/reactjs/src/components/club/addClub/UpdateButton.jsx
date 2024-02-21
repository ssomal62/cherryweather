import React from 'react';
import {Button} from "@nextui-org/react";
import {IoIosAddCircleOutline} from "react-icons/io";

const UpdateButton = ({isNextDisabled, onUpdate}) => {
    return (
        <div>
            <Button
                isDisabled={isNextDisabled}
                variant='ghost'
                startContent={<IoIosAddCircleOutline style={styles.icon}/>}
                size='lg'
                color='danger'
                fullWidth
                onPress={onUpdate}
            >
                클럽 수정하기
            </Button>
        </div>
    );
};

export default UpdateButton;


const styles = {
    icon : {
        width:24,
        height:24,
    }
}
