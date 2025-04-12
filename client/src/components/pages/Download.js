import { useState, useEffect } from "react";
import { addToDownloadHistory, getDownloadHistory } from "../../utils/downloadHistory";
import DownloadHistory from "../DownloadHistory";

function Download() {
    const [url, setUrl] = useState(null);
    const [history, setHistory] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        // Load history on component mount
        setHistory(getDownloadHistory());
    }, []);

    const handleInputChange = (e) => {
        setUrl(e.target.value);
        // Clear preview when URL changes
        setPreview(null);
    }

    const handleDownload = async () => {
        if (!url) return;

        try {
            // Get file information
            const response = await fetch(url);
            const blob = await response.blob();
            const fileType = blob.type;
            const fileName = url.substring(url.lastIndexOf("/") + 1);
            
            // Add to download history
            addToDownloadHistory({
                name: fileName,
                type: fileType,
                size: blob.size,
                url: url,
                timestamp: Date.now()
            });

            // Update history state
            setHistory(getDownloadHistory());

            // Set preview for images
            if (fileType.startsWith('image/')) {
                const objectUrl = URL.createObjectURL(blob);
                setPreview(objectUrl);
            }

            // Create download link
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Error downloading file. Please check the URL and try again.');
        }
    }

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2rem',
        gap: '2rem'
    }

    const formStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        padding: '3rem',
        borderRadius: '12px',
        background: 'linear-gradient(145deg, rgba(15, 52, 96, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        width: '80%',
        maxWidth: '600px'
    }

    const labelStyles = {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#ffd700',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    }

    const inputStyles = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '8px',
        background: 'rgba(10, 25, 47, 0.8)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        color: '#ffd700',
        fontSize: '1rem',
        '::placeholder': {
            color: 'rgba(255, 215, 0, 0.5)'
        }
    }

    const buttonStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'linear-gradient(90deg, #0a192f 0%, #1a1a2e 100%)',
        color: '#ffd700',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        textDecoration: 'none',
        ':hover': {
            background: 'linear-gradient(90deg, #1a1a2e 0%, #0a192f 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
        }
    }

    const previewStyles = {
        maxWidth: '100%',
        maxHeight: '300px',
        borderRadius: '8px',
        marginTop: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }

    return (
        <div style={containerStyles}>
            <div style={formStyles}>
                <label style={labelStyles}>
                    Paste Your Download Link
                </label>
                <input
                    type="input"
                    onChange={handleInputChange}
                    style={inputStyles}
                    placeholder="Paste your file URL here"
                />
                {preview && (
                    <img 
                        src={preview} 
                        alt="File preview" 
                        style={previewStyles}
                        onError={() => setPreview(null)}
                    />
                )}
                <button
                    onClick={handleDownload}
                    style={buttonStyles}
                    disabled={!url}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-download"
                        viewBox="0 0 16 16"
                    >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    <span style={{ paddingLeft: '0.5rem' }}>Download</span>
                </button>
            </div>
            <DownloadHistory />
        </div>
    );
}

export default Download;
