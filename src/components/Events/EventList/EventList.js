import React from "react";
import EventItem from "./EventItem/EventItem";

const EventList = (props) => {
  return (
    <ul className="events__list">
      {props.events.map((event) => {
        return (
          <EventItem
            key={event._id}
            eventTitle={event.title}
            eventPrice={event.price}
            userId={props.authUserId}
            creatorId={event.createdBy._id}
            showViewDetail={props.onViewDetail}
            eventId={event._id}
          />
        );
      })}
    </ul>
  );
};

export default EventList;
