import {Routes, Route} from 'react-router-dom'

import Home from './components/pages/Home'
import Upload from './components/pages/Upload'
import Header from './components/Header'
import Download from './components/pages/Download'
function App() {
  return (
    <div className='App'>
      <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="upload" element={<Upload />} />
      <Route path="download" element={<Download/>} />
    </Routes>
    </div>
  );
}

export default App;
