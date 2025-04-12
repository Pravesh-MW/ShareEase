import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import { getDownloadHistory, clearDownloadHistory } from '../utils/downloadHistory';

const DownloadHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Load history on component mount
        setHistory(getDownloadHistory());
        
        // Set up interval to refresh history every minute
        const interval = setInterval(() => {
            setHistory(getDownloadHistory());
        }, 60000);
        
        return () => clearInterval(interval);
    }, []);

    const handleClearHistory = () => {
        clearDownloadHistory();
        setHistory([]);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    const getFileIcon = (type) => {
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('video/')) return '🎥';
        if (type.startsWith('audio/')) return '🎵';
        if (type.includes('pdf')) return '📄';
        if (type.includes('zip') || type.includes('compressed')) return '📦';
        return '📁';
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Downloads (Last 24 Hours)</Typography>
                {history.length > 0 && (
                    <Tooltip title="Clear History">
                        <IconButton onClick={handleClearHistory} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            
            {history.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center">
                    No recent downloads
                </Typography>
            ) : (
                <List>
                    {history.map((item, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Tooltip title="Download Again">
                                    <IconButton 
                                        edge="end" 
                                        aria-label="download"
                                        onClick={() => window.open(item.url, '_blank')}
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>{getFileIcon(item.type)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            {formatTime(item.timestamp)}
                                        </Typography>
                                        {` — ${(item.size / 1024 / 1024).toFixed(2)} MB`}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default DownloadHistory; 