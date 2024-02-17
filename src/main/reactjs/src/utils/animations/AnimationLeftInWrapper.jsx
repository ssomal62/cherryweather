import React from 'react';
import { motion } from 'framer-motion';
import { pageEffectLeft } from './animation_left_in';

const AnimationLeftInWrapper = ({ children, ...rest }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.5 }}
            variants={pageEffectLeft}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default AnimationLeftInWrapper;
