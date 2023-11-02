import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading: React.FC = () => {
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    };

    const spinnerSize = "4rem";

    return (
        <div style={centerStyle}>
            <Spinner
                animation="border"
                role="status"
                style={{ width: spinnerSize, height: spinnerSize }}
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loading;
