
import React from "react";
import {Tab, Tabs} from "@nextui-org/react";

export default function ChatHeader() {

    const classStyle ="text-white text-opacity-90 font-bold text-2xl drop-shadow shadow-black";
    return (
        <Tabs variant='underlined' aria-label="Tabs variants" fullWidth size='lg'>
            <Tab title="오늘의 옷차림" style={{...styles.title}} className={classStyle}/>
            <Tab title="보이스 체리" style={{...styles.title}} className={classStyle}/>
            <Tab title="추천 옷차림" style={{...styles.title}} className={classStyle}/>
        </Tabs>
    );
}

const styles = {
    title:{
        fontSize:20,
        fontWeight:900,
    }
}
