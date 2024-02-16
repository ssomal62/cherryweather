export const pageEffectLeft = {
    initial: {
        x: '-100vw',
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
        x: '100vw',
        opacity: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 50,
        }
    }
};

