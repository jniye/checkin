import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Popover, Overlay } from "react-bootstrap";

function DateRangePicker({
  show,
  handleVisible,
  datePickerButtonRef,
  datePickerPopupRef,
  setCheckInDate,
  setCheckOutDate,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (start && end && end - start < 86400000) {
      return;
    }
    setStartDate(start);
    setEndDate(end);
    setCheckInDate(start);
    setCheckOutDate(end);
  };

  const formatDate = (date) => {
    if (!date) return "Check-in Date";

    // Define arrays for abbreviated month and weekday names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get the day, month, and weekday
    const day = date.getDate();
    const month = months[date.getMonth()];
    const weekday = weekdays[date.getDay()];

    // Construct the formatted date string
    return `${day} ${month} ${weekday}`;
  };

  return (
    <div>
      <input
        type="text"
        ref={datePickerButtonRef}
        onClick={handleVisible}
        value={`${formatDate(startDate)} - ${formatDate(endDate)}`}
        readOnly
        placeholder="Select date range"
        style={{
          width: "180px",
        }}
      />
      <Overlay
        target={datePickerButtonRef.current}
        show={show}
        placement="bottom"
        containerPadding={20}
      >
        <Popover id="date-picker-popover" ref={datePickerPopupRef}>
          <Popover.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "700px",
              }}
            >
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                selectsRange
                inline
                monthsShown={2}
              />
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default DateRangePicker;
