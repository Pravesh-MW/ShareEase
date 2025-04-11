import {Routes, Route} from 'react-router-dom'

import Home from './components/pages/Home'
import Upload from './components/pages/Upload'
import Header from './components/Header'
import Download from './components/pages/Download'
import Footer from './components/Footer'

function App() {
  const appStyles = {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0a192f 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
    color: '#e9ecef',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    flexDirection: 'column'
  }

  const mainContentStyles = {
    flex: 1,
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  }

  return (
    <div style={appStyles}>
      <Header />
      <main style={mainContentStyles}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="download" element={<Download/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
