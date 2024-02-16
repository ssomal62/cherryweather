import React from "react";
import {Tab, Tabs} from "@nextui-org/react";

export default function ClubListHeader() {

    const classStyle ="text-white text-opacity-90 font-bold text-2xl drop-shadow shadow-black";
    return (
        <Tabs variant='underlined' aria-label="Tabs variants" fullWidth size='lg'>
            <Tab title="우산" style={{...styles.title}} className={classStyle}/>
            <Tab title="신규" style={{...styles.title}} className={classStyle}/>
            <Tab title="인기" style={{...styles.title}} className={classStyle}/>
        </Tabs>
    );
}

const styles = {
    title:{
        fontSize:20,
        fontWeight:900,
    }
}
