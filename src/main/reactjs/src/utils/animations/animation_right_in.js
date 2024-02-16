export const pageEffectRight = {
    initial: {
        x: '100%',
        opacity: 0
    },
    in: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 50,
        }
    },
    out: {
        x: '-100%',
        opacity: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 50,
        }
    }
};

