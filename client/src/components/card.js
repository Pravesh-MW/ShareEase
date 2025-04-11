import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
    const cardStyles = {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2.5rem',
        padding: '3rem',
        borderRadius: '12px',
        background: 'linear-gradient(145deg, rgba(15, 52, 96, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(255, 215, 0, 0.1)'
        }
    }

    const headingStyles = {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#ffd700',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    }

    const buttonStyles = {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #0a192f 0%, #1a1a2e 100%)',
        color: '#ffd700',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        ':hover': {
            background: 'linear-gradient(90deg, #1a1a2e 0%, #0a192f 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
        }
    }

    return (
        <div style={cardStyles}>
            <p style={headingStyles}>{props.heading}</p>
            <Link to={props.heading.includes('Upload') ? '/upload' : '/download'} style={buttonStyles}>
                {props.button}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                </svg>
            </Link>
        </div>
    );
}

export default Card;
