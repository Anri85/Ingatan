import React, { useState } from 'react';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ModalComponent = ({ status, message, isOpen }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(isOpen);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Warning</h2>
                    <p id="transition-modal-description">status: {status} message: {message}</p>
                </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalComponent