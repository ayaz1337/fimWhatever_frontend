import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles/Modal.scss';
import { motion } from 'framer-motion';

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

export default function CircularLoader({ state }) {
    if (state) {
        return (
            <motion.div className='backdrop'
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden">
                <motion.div className='modal circular'>
                    <Box sx={{ display: 'flex' }} >
                        <CircularProgress />
                    </Box>
                </motion.div>
            </motion.div>
        );
    }
}