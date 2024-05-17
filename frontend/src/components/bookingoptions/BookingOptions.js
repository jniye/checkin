import React, { useState, useEffect } from "react";
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
  childAges,
  setChildAges,
}) {
  useEffect(() => {
    // Adjust the childAges array when the number of children changes
    if (children > childAges.length) {
      setChildAges([...childAges, ...Array(children - childAges.length).fill('')]);
    } else if (children < childAges.length) {
      setChildAges(childAges.slice(0, children));
    }
  }, [children, childAges, setChildAges]);

  function Counter({ label, value, onIncrement, onDecrement }) {
    return (
      <div>
        <label>{label}</label>
        <div className="counter-container">
          <button
            onClick={onDecrement}
            disabled={value <= ((label === "Rooms" || label === "Adults") ? 1 : 0)}
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
        style={{
          width: "200px",
        }}
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
            {children > 0 && (
              <div className="child-ages-container">
                {childAges.map((age, index) => (
                  <div key={index} className="child-age-select">
                    <select
                      value={age}
                      onChange={(e) => {
                        const newAges = [...childAges];
                        newAges[index] = e.target.value;
                        setChildAges(newAges);
                      }}
                    >
                      <option value="">Age needed</option>
                      {[...Array(18).keys()].map((age) => (
                        <option key={age} value={age}>
                          {age} years old
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
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
