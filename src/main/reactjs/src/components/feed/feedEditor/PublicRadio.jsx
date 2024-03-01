import React from "react";
import {cn, RadioGroup, useRadio, VisuallyHidden} from "@nextui-org/react";
import {FaLock, FaLockOpen} from "react-icons/fa";

export const CustomRadio = (props) => {
    const {
        Component,
        children,
        isSelected,
        description,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps,
    } = useRadio(props);

    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
                "data-[selected=true]:border-primary",
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
            <div {...getLabelWrapperProps()}>
                {children && <span {...getLabelProps()}>{children}</span>}
                {description && (
                    <span className="text-small text-foreground opacity-70">{description}</span>
                )}
            </div>
        </Component>
    );
};

export default function PublicRadio({isPublic, setIsPublic}) {


    return (
        <div>
            <RadioGroup color="danger"
                        value={isPublic.toString()}
                        onValueChange={setIsPublic}
            >
                <div className="flex flex-row justify-between max-w max-w-[600px]">
                    <CustomRadio value="true" style={styles.radio} className="flex flex-col" isSelected>
                        <FaLockOpen style={styles.icon}/>
                       <span className="text-small"> 전체공개</span>
                    </CustomRadio>
                    <CustomRadio value="false" style={styles.radio} className="flex flex-col">
                        <FaLock style={styles.icon}/>
                        <span className="text-small"> 클럽공개</span>
                    </CustomRadio>
                </div>
            </RadioGroup>
        </div>
    );
}

const styles = {
    icon : {
        width: '30px',
        height:'30px',
        color : '#F31260',
    },
    radio : {
        width: '49%',
        height:'80px',
        borderRadius:'20px',
        border: '1px solid #E4E4E7',
    }
}
