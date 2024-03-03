import React from 'react';
import { motion } from 'framer-motion';

const FadeInAnimation = ({ children, ...rest }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }} // 초기 상태에서 완전 투명
            animate={{
                opacity: 1, // 최종 상태에서 완전 불투명
                transition: {
                    duration: 1.5, // 애니메이션 지속 시간 1.5초
                    ease: "easeInOut", // 시작과 끝이 부드러운 속도 조절
                },
            }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

export default FadeInAnimation;
