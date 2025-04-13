import { useState, useCallback, useEffect } from "react";
import Copy from "../Copy";
import UploadHistory from "../UploadHistory";
import { addToUploadHistory, getUploadHistory } from "../../utils/uploadHistory";
import Toast from "../Toast";
import { Box, Typography, Button, Paper, IconButton, Tooltip, Grid, Container } from '@mui/material';
import { CloudUpload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

function Upload() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [toast, setToast] = useState(null);
  const [history, setHistory] = useState([]);

  // Load initial history
  useEffect(() => {
    setHistory(getUploadHistory());
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
        showToast('File size exceeds 100MB limit', 'error');
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      showToast('File selected successfully', 'success');
    }
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 100 * 1024 * 1024) { // 100MB limit
        showToast('File size exceeds 100MB limit', 'error');
        return;
      }
      setFile(droppedFile);
      setFileName(droppedFile.name);
      showToast('File selected successfully', 'success');
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      showToast('Please select a file first', 'error');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      showToast('Uploading file...', 'info');

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/files`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLink(data.url);
        setUploadStatus("Success");
        
        // Add to upload history
        const newHistoryEntry = {
          name: file.name,
          type: file.type,
          size: file.size,
          url: data.url,
          timestamp: Date.now(),
          status: "Success"
        };
        addToUploadHistory(newHistoryEntry);
        
        // Update history state
        setHistory(prevHistory => [newHistoryEntry, ...prevHistory]);

        showToast('File uploaded successfully!', 'success');
        setFile(null);
        setFileName("");
        event.target.reset();
      } else {
        setUploadStatus("Failed");
        showToast('File upload failed. Please try again.', 'error');
      }
    } catch (error) {
      setUploadStatus("Failed");
      showToast('Error uploading file. Please try again.', 'error');
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Upload Card */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              minHeight: '500px',
              background: 'linear-gradient(145deg, rgba(15, 52, 96, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, color: '#ffd700', textAlign: 'center', fontWeight: 'bold' }}>
              Upload Your File
            </Typography>
            
            <Box
              sx={{
                border: `2px dashed ${isDragging ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}`,
                borderRadius: '8px',
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                mb: 3,
                backgroundColor: 'rgba(10, 25, 47, 0.3)',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  borderColor: '#ffd700',
                  backgroundColor: 'rgba(10, 25, 47, 0.4)'
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <UploadIcon sx={{ fontSize: 64, color: '#ffd700', mb: 2 }} />
              <Typography variant="body1" sx={{ color: '#ffd700', fontSize: '1.1rem' }}>
                {isDragging ? 'Drop your file here' : 'Drag & drop your file here or click to browse'}
              </Typography>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </Box>

            {fileName && (
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: 'rgba(10, 25, 47, 0.3)', borderRadius: '8px' }}>
                <Typography variant="body1" sx={{ color: '#ffd700', fontWeight: 500 }}>
                  Selected: {fileName}
                </Typography>
                <Tooltip title="Clear Selection">
                  <IconButton onClick={() => {
                    setFile(null);
                    setFileName("");
                    document.getElementById('fileInput').value = "";
                  }} sx={{ color: '#ffd700' }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleFormSubmit}
              disabled={!file || uploadStatus === "Uploading..."}
              sx={{
                py: 1.5,
                background: !file ? 'rgba(10, 25, 47, 0.5)' : 'linear-gradient(90deg, #0a192f 0%, #1a1a2e 100%)',
                color: '#ffd700',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: !file ? 'rgba(10, 25, 47, 0.5)' : 'linear-gradient(90deg, #1a1a2e 0%, #0a192f 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
                },
                '&.Mui-disabled': {
                  background: 'rgba(10, 25, 47, 0.5)',
                  color: 'rgba(255, 215, 0, 0.5)',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                }
              }}
            >
              {uploadStatus === "Uploading..." ? "Uploading..." : "Upload File"}
            </Button>

            {link && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffd700', mb: 2, textAlign: 'center' }}>
                  Here's your file link! Share it with anyone
                </Typography>
                <Copy link={link} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* History Card */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              minHeight: '500px',
              background: 'linear-gradient(145deg, rgba(15, 52, 96, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '12px'
            }}
          >
            <UploadHistory history={history} setHistory={setHistory} />
          </Paper>
        </Grid>
      </Grid>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Container>
  );
}

export default Upload;
