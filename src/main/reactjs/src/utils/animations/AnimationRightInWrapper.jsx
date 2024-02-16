import React from 'react';
import { motion } from 'framer-motion';
import { pageEffectRight } from './animation_right_in';

const AnimationRightInWrapper = ({ children, ...rest }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.5 }}
            variants={pageEffectRight}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default AnimationRightInWrapper;
