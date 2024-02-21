import React from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Button} from "@nextui-org/react";


const RecommendKeywords = () => {
    const rKeywords=["🚲자전거","🎣낚시","🎨전시","🏃🏼‍♂️러닝","🤓스터디","🧑🏼‍🍳요리","🎠방탈출","🎮게임"]
    return (

        <section style={{padding: 20}}>

            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward className="mr-2"/>
                    <p className="text-md font-bold">추천 키워드</p>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                {
                    rKeywords.map((item, index) => (
                        <div key={index}
                             style={{margin: '5px'}}>
                            <Button
                                size="lg"
                                radius="full"
                                color="success"
                                variant="flat"
                            >
                                {item}
                            </Button>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default RecommendKeywords;

const styles = {
    font         : {
        color       : 'black',
        marginBottom: '5%',
    },
    slideSections: {
        display   : 'flex',
        alignItems: 'flex-end',
        overflow  : 'hidden',
        position  : 'relative',
        cursor    : 'pointer',
    }
}

