import { useState, useCallback } from "react";
import Copy from "../Copy";

function Upload() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
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
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:2000/api/files", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLink(data.url);
        alert("File uploaded successfully");
        setFile(null);
        setFileName("");
        event.target.reset();
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '2rem 1rem',
    gap: '2rem',
    '@media (max-width: 768px)': {
      padding: '1rem 0.5rem',
      gap: '1rem'
    }
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
    maxWidth: '600px',
    '@media (max-width: 768px)': {
      width: '95%',
      padding: '2rem 1rem',
      gap: '1.5rem'
    },
    '@media (max-width: 480px)': {
      width: '100%',
      padding: '1.5rem 1rem',
      gap: '1rem'
    }
  }

  const dropZoneStyles = {
    width: '100%',
    padding: '2rem',
    border: `2px dashed ${isDragging ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}`,
    borderRadius: '8px',
    backgroundColor: 'rgba(10, 25, 47, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '200px',
    '@media (max-width: 768px)': {
      padding: '1.5rem',
      minHeight: '150px'
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      minHeight: '120px'
    },
    ':hover': {
      borderColor: '#ffd700',
      backgroundColor: 'rgba(10, 25, 47, 0.4)'
    }
  }

  const labelStyles = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
    }
  }

  const fileInfoStyles = {
    color: '#ffd700',
    fontSize: '1rem',
    textAlign: 'center',
    marginTop: '1rem',
    wordBreak: 'break-word',
    maxWidth: '100%',
    '@media (max-width: 480px)': {
      fontSize: '0.9rem'
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
    width: '100%',
    maxWidth: '200px',
    justifyContent: 'center',
    '@media (max-width: 480px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem'
    },
    ':hover': {
      background: 'linear-gradient(90deg, #1a1a2e 0%, #0a192f 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
    }
  }

  const iconStyles = {
    fontSize: '2rem',
    color: '#ffd700',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.75rem',
      marginBottom: '0.75rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
      marginBottom: '0.5rem'
    }
  }

  const instructionTextStyles = {
    color: '#ffd700',
    textAlign: 'center',
    fontSize: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem'
    }
  }

  return (
    <div style={containerStyles}>
      <form style={formStyles} onSubmit={handleFormSubmit}>
        <label style={labelStyles}>Upload Your File</label>
        <div
          style={dropZoneStyles}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <svg
            style={iconStyles}
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
          <p style={instructionTextStyles}>
            {isDragging ? 'Drop your file here' : 'Drag & drop your file here or click to browse'}
          </p>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {fileName && (
          <div style={fileInfoStyles}>
            Selected file: {fileName}
          </div>
        )}
        <button type="submit" style={buttonStyles} disabled={!file}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
          <span style={{ paddingLeft: '0.5rem' }}>Upload</span>
        </button>
      </form>
      <div>
        {link === "" ? <></> : <Copy link={link} />}
      </div>
    </div>
  );
}

export default Upload;
