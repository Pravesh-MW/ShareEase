import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Tooltip, Chip } from '@mui/material';
import { Delete as DeleteIcon, ContentCopy as CopyIcon } from '@mui/icons-material';
import { clearUploadHistory } from '../utils/uploadHistory';

const UploadHistory = ({ history, setHistory }) => {
    const handleClearHistory = () => {
        clearUploadHistory();
        setHistory([]);
    };

    const handleCopyLink = (link) => {
        navigator.clipboard.writeText(link);
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

    const formatFileSize = (size) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / 1024 / 1024).toFixed(2)} MB`;
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Uploads (Last 24 Hours)</Typography>
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
                    No recent uploads
                </Typography>
            ) : (
                <List>
                    {history.map((item, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Tooltip title="Copy Link">
                                    <IconButton 
                                        edge="end" 
                                        aria-label="copy"
                                        onClick={() => handleCopyLink(item.url)}
                                    >
                                        <CopyIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>{getFileIcon(item.type)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body1" component="span">
                                            {item.name}
                                        </Typography>
                                        <Chip 
                                            label={formatFileSize(item.size)} 
                                            size="small" 
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </Box>
                                }
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            {formatTime(item.timestamp)}
                                        </Typography>
                                        {item.status && (
                                            <Chip 
                                                label={item.status} 
                                                size="small" 
                                                color={item.status === 'Success' ? 'success' : 'error'}
                                                sx={{ ml: 1 }}
                                            />
                                        )}
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

export default UploadHistory; 