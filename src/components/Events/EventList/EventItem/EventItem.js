import React from "react";

const EventItem = (props) => {
  return (
    <li className="events__list__item">
      <div>
        <h3>{props.eventTitle}</h3>
        <p className="event__list__item__price">{`Price: $ ${props.eventPrice}`}</p>
      </div>
      <div>
        {props.userId === props.creatorId ? (
          <p className="event__view_details__message">This Is Your Event</p>
        ) : (
          <button
            onClick={() => {
              props.showViewDetail(props.eventId);
            }}
            className="event__view_details__btn"
          >
            View Details
          </button>
        )}
      </div>
    </li>
  );
};

export default EventItem;
