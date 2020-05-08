import React from "react";
import "./BookingList.css";

const BookingList = (props) => {
  return (
    <ul className="bookings__list">
      {props.bookings.map((booking) => {
        return (
          <li key={booking._id} className="bookings__list__item">
            <div className="bookings__item-data">
              <h3>{booking.event.title}</h3>
              <p>{`Date : ${new Date(
                Number(booking.event.date)
              ).toLocaleDateString()}`}</p>
            </div>
            <div className="bookings__item-actions">
              <button
                className="bookings__item__cancel-btn"
                onClick={() => {
                  props.onCancel(booking._id);
                }}
              >
                Cancel
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default BookingList;
