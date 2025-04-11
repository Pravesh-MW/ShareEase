import { Link } from "react-router-dom";

function Header() {
    const headerStyles = {
        background: 'linear-gradient(90deg, #0a192f 0%, #1a1a2e 100%)',
        padding: '1rem 2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255, 215, 0, 0.2)'
    }

    const navStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    }

    const linkStyles = {
        color: '#ffd700',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        fontWeight: 500,
        fontSize: '1.1rem',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
        ':hover': {
            background: 'rgba(255, 215, 0, 0.1)',
            transform: 'translateY(-2px)',
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.1)'
        }
    }

    return (
        <header style={headerStyles}>
            <nav style={navStyles}>
                <Link style={linkStyles} to="/home">Home</Link>
                <Link style={linkStyles} to="/upload">Upload</Link>
                <Link style={linkStyles} to="/download">Download</Link>
            </nav>
        </header>
    );
}

export default Header;