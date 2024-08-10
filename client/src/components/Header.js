import { Link } from "react-router-dom";

function Header() {
    return (
      <>
        <div className="flex justify-center items-center space-x-8 flex-row h-12 bg-slate-500">
          <Link className="inline-block px-3 py-4"to="/home">Home</Link>
          <Link className="inline-block px-3 py-4"to="/upload">Upload</Link>
          <Link className="inline-block px-3 py-4"to="/download">Download</Link>
        </div>
      </>
    );
  }
  
  
  export default Header;