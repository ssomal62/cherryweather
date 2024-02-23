import React from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Button} from "@nextui-org/react";


const RecommendKeywords = () => {
    const rKeywords=["🚲자전거","🎣낚시","🎨전시","🏃🏼‍♂️러닝","🤓스터디","🧑🏼‍🍳요리","🎠방탈출","🎮게임"]
    return (

        <section >

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
                        <React.Fragment key={index}>
                            <div style={{margin:'0px 10px 0 0'}}>
                                <Button
                                    radius="full"
                                    color="success"
                                    variant="flat"
                                >
                                    {item}
                                </Button>
                            </div>
                            {((index + 1) % 3 === 0) && <div style={{ width: '100%' }}><br /></div>}
                        </React.Fragment>
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
        padding: '20px',
    },
    slideSections: {
        display   : 'flex',
        alignItems: 'flex-end',
        overflow  : 'hidden',
        position  : 'relative',
        cursor    : 'pointer',
    }
}

