import React from 'react'

const NotFound = () => {
    return (
        <div style={compStyle}>
            <h2>Not found</h2>
            <p className='lead'>The page you are looking for does not exist</p>
        </div>
    );
}

const compStyle = {
    marginTop: '7rem',
};

export default NotFound;