import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import SearchBar from "./components/searchbar/SearchBar";
import CardList from "./components/card/cardList";
import Card from "./components/card/card";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";

function App() {
  const [suggestions, setSuggestions] = useState([]);

  // Handler to simulate fetching suggestions
  const handleSearch = (searchParams) => {
    // Assuming searchParams are used to fetch data

    // parse searchParams to JSON
    const bookingJson = JSON.stringify(searchParams);
    // Example of sending data to a backend API (uncomment when needed)
    // fetch('/api/bookings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: bookingJson
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
    console.log(bookingJson)
    setSuggestions([
      { name: "Place A", rate: 4.5, comments: 150 },
      { name: "Place B", rate: 4.0, comments: 85 },
      { name: "Place C", rate: 3.5, comments: 42 },
      { name: "Place D", rate: 4.7, comments: 200 },
      { name: "Place E", rate: 4.2, comments: 120 },
    ]);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <CardList suggestions={suggestions} />
    </div>
  );
}

export default App;
