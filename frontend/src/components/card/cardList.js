
import React from 'react';
import SuggestionCard from './card';

function CardList({ suggestions }) {
    return (
        <div className="suggestions-container">
            {suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
            ))}
        </div>
    );
}

export default CardList;
