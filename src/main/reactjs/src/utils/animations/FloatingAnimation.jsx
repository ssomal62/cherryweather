import React from 'react';
import { motion } from 'framer-motion';

const FloatingAnimation = ({ children, ...rest }) => {
    return (
        <motion.div
            animate={{
                y: ["0%", "10%"], // 시작 지점에서 10% 상하로 이동
                transition: {
                    duration: 2, // 애니메이션 지속 시간 2초
                    ease: "easeInOut", // 시작과 끝이 부드러운 속도 조절
                    repeat: Infinity, // 무한 반복
                    repeatType: "reverse", // 애니메이션 반복 타입 'reverse'로 설정하여 떠오르고 내려가기를 반복
                },
            }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

export default FloatingAnimation;
