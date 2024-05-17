
import React from 'react';
import Rating from '@mui/material/Rating';
function Card({ suggestion }) {
    return (
        <div className="suggestion-card">
            <h3>{suggestion.name}</h3>
            <Rating name="Rating" value={suggestion.rate} readOnly />
            <p>Comments: {suggestion.comments}</p>
        </div>
    );
}

export default Card;
