import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.css";
import BookingOptions from "../bookingoptions/BookingOptions";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [pets, setPets] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const searchBarRef = useRef(null);
  const optionsButtonRef = useRef(null);
  const optionsPopupRef = useRef(null);
  const datePickerButtonRef = useRef(null);
  const datePickerPopupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        optionsButtonRef.current &&
        !optionsButtonRef.current.contains(event.target) &&
        optionsPopupRef.current &&
        !optionsPopupRef.current.contains(event.target)
      ) {
        setIsOptionsVisible(false);
      }
      if (
        datePickerButtonRef.current &&
        !datePickerButtonRef.current.contains(event.target) &&
        datePickerPopupRef.current &&
        !datePickerPopupRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      setErrorMessage("Enter a destination to start searching.");
      return;
    }
    setErrorMessage(""); // Clear the error message if validation passes

    const bookingDetails = {
      destination,
      checkInDate,
      checkOutDate,
      adults,
      children,
      rooms,
      pets,
    };
    onSearch(bookingDetails);
  };

  const handleOptionsVisible = (e) => {
    e.preventDefault();
    setIsOptionsVisible(!isOptionsVisible); // Toggle visibility
  };

  const handleDatePickerVisible = (e) => {
    e.preventDefault();
    setShowDatePicker(!showDatePicker); // Toggle visibility
  };

  const getPlaceholderText = () => {
    let placeholder = `${adults} Adult${
      adults !== 1 ? "s" : ""
    } · ${children} Children`;
    if (pets) {
      placeholder += " · Pets";
    }
    placeholder += ` · ${rooms} Room${rooms !== 1 ? "s" : ""}`;
    return placeholder;
  };

  return (
    <form className="search-bar" ref={searchBarRef} onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="input-container">
          <input
            type="text"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        <DateRangePicker
          show={showDatePicker}
          handleVisible={handleDatePickerVisible}
          datePickerButtonRef={datePickerButtonRef}
          datePickerPopupRef={datePickerPopupRef}
          setCheckInDate={setCheckInDate}
          setCheckOutDate={setCheckOutDate}
        />
        <BookingOptions
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          rooms={rooms}
          setRooms={setRooms}
          pets={pets}
          setPets={setPets}
          isOptionsVisible={isOptionsVisible}
          setIsOptionsVisible={setIsOptionsVisible}
          optionsButtonRef={optionsButtonRef}
          optionsPopupRef={optionsPopupRef}
          handleVisible={handleOptionsVisible}
          getPlaceholderText={getPlaceholderText}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;
