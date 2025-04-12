import React, { useEffect, useState } from 'react';
import { Box, Typography, Slide } from '@mui/material';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'rgba(76, 175, 80, 0.9)';
            case 'error':
                return 'rgba(244, 67, 54, 0.9)';
            case 'info':
                return 'rgba(33, 150, 243, 0.9)';
            default:
                return 'rgba(0, 0, 0, 0.9)';
        }
    };

    const toastStyles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        maxWidth: '300px',
        '@media (max-width: 600px)': {
            maxWidth: '90%',
            right: '5%',
            top: '10px'
        }
    };

    return (
        <Slide direction="left" in={show} mountOnEnter unmountOnExit>
            <Box style={toastStyles}>
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {message}
                </Typography>
            </Box>
        </Slide>
    );
};

export default Toast; 