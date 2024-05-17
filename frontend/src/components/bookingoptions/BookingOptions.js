import React from "react";
import "./BookingOptions.css";

function BookingOptions({
  adults,
  setAdults,
  children,
  setChildren,
  rooms,
  setRooms,
  pets,
  setPets,
  isOptionsVisible,
  setIsOptionsVisible,
  optionsButtonRef,
  optionsPopupRef,
  handleVisible,
  getPlaceholderText,
}) {
  function Counter({ label, value, onIncrement, onDecrement }) {
    return (
      <div>
        <label>{label}</label>
        <div className="counter-container">
          <button
            onClick={onDecrement}
            disabled={value <= (label === "Rooms" || "Adults" ? 1 : 0)}
          >
            -
          </button>
          <input type="text" readOnly value={value} />
          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <input
        type="text"
        className="placeholder-container"
        onClick={handleVisible}
        readOnly
        value={getPlaceholderText()}
        ref={optionsButtonRef}
      />
      {isOptionsVisible && (
        <div className="dropdown-container" ref={optionsPopupRef}>
          <div className="booking-options">
            <Counter
              label="Adults"
              value={adults}
              onIncrement={() => setAdults(adults + 1)}
              onDecrement={() => setAdults(adults - 1)}
            />
            <Counter
              label="Children"
              value={children}
              onIncrement={() => setChildren(children + 1)}
              onDecrement={() => setChildren(children - 1)}
            />
            <Counter
              label="Rooms"
              value={rooms}
              onIncrement={() => setRooms(rooms + 1)}
              onDecrement={() => setRooms(rooms - 1)}
            />
            <div className="horizontal-line"></div>
            <div>
              <label htmlFor="pets-toggle">Traveling with pets?</label>
              <input
                type="checkbox"
                id="pets-toggle"
                checked={pets}
                onChange={() => setPets(!pets)}
              />
              <label htmlFor="pets-toggle"></label>
            </div>
            <button
              type="button"
              className="done-button"
              onClick={() => setIsOptionsVisible(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingOptions;
