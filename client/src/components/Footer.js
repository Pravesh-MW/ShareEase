function Footer() {
    const footerStyles = {
        background: 'linear-gradient(90deg, #0a192f 0%, #1a1a2e 100%)',
        color: '#ffd700',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 215, 0, 0.2)',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
    }

    const textStyles = {
        margin: 0,
        fontSize: '0.9rem',
        opacity: 0.9
    }

    return (
        <footer style={footerStyles}>
            <p style={textStyles}>© {new Date().getFullYear()} ShareEase - Secure File Sharing</p>
        </footer>
    );
}

export default Footer;