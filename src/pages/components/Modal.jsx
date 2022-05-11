import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/Modal.scss';
import { MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md'

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

const modalVariants = {
    visible: { opacity: 1, y: "200px", transition: { duration: 1, type: "spring", mass: 0.5 } },
    hidden: { opacity: 0, y: "-100vh" }
}

export default function Modal({ modal, setModal, modalmsg, redirect, status }) {
    const handleClick = (event) => {
        redirect ? window.location.reload(true) : setModal(false)
    }

    return (
        <AnimatePresence exitBeforeEnter onExitComplete={() => setModal(false)}>
            {modal && (
                <motion.div className='backdrop'
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden">
                    <motion.div className='modal'
                        variants={modalVariants}>
                        {status ? <MdCheckCircleOutline className='modal__icon success' /> : <MdErrorOutline className='modal__icon error' />}
                        <p>{modalmsg}</p>
                        <input type="button" className='modal__btn' value="OK" onClick={handleClick}></input>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}


