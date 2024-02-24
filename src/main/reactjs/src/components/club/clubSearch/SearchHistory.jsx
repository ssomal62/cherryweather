import React, {useState} from 'react';
import {Button} from "@nextui-org/react";
import {IoIosArrowForward, IoIosClose} from "react-icons/io";

const SearchHistory = ({keywords,onRemove,onRemoveAll}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);
    };

    const stopDragging = (e) => {
        if (!isDragging) return;
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // 텍스트 선택 방지
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - startX) * 2; // 드래그 거리에 따라 스크롤 속도 조절
        e.currentTarget.scrollLeft = scrollLeft - walk;
    };


    return (
        <section style={{padding: 20}}>
            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward className="mr-2"/>
                    <p className="text-md font-bold">최근 검색어</p>
                </div>
                <div className="text-md text-tiny item-end font-mono" style={{color: 'gray', cursor:'pointer'}}
                     onClick={onRemoveAll}
                >모두 지우기</div>
            </div>

            <div
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onMouseMove={handleMouseMove}
                 style={{
                     display               : 'flex',
                     overflowX             : 'auto',
                     padding               : '10px 0',
                     scrollbarWidth        : 'none',
                     msOverflowStyle       : 'none',
                     '&::-webkit-scrollbar': {
                         display: 'none'
                     }
                 }}
            >
                {
                    keywords.map((item, index) => (
                        <div key={index}
                             style={{marginRight: '10px'}}>
                            <Button
                                style={{border: '1px solid gray', padding: '5px 10px'}}
                                radius="full"
                                color="default"
                                variant="bordered"
                                endContent={<IoIosClose style={{cursor:'pointer'}} onClick={()=> onRemove(index)}/>}
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


export default SearchHistory;

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



