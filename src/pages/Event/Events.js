import React, { useRef, useContext, useEffect, useState } from "react";
import "./Events.css";
import Modal from "../../components/Modal/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import EventList from "../../components/Events/EventList/EventList";
import Spinner from "../../components/Spinner/Spinner";
import DatePicker from "../../components/DatePicker/DatePicker";
import TimePicker from "../../components/TimePicker/TimePicker";
import moment from "moment";

const Events = () => {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef();
  const viewModalRef = useRef();
  const datePickerRef = useRef();
  const timePickerRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  const context = useContext(AuthContext);

  const addEvent = () => {
    const title = titleRef.current.value;
    const descreption = descRef.current.value;
    const price = +priceRef.current.value;
    const date = dateRef.current.value;
    const time = timeRef.current.value;

    const date_time = moment(`${date} ${time}`, "DD/MM/YYYY hh:mmA");

    const reqBody = {
      query: `
          mutation CreateEvent($title: String!, $descreption: String!, $price: Float!, $date: String!) {
            createEvent(eventInput: {title: $title, descreption: $descreption, price: $price, date: $date}) {
              _id
              title
              descreption
              date
              price
              createdBy{
                _id
                email
              }
            }
          }
        `,
      variables: {
        title: title,
        descreption: descreption,
        price: price,
        date: date_time,
      },
    };

    fetch("https://easyevents-graphql-api.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Request Failed !");
        }
        return res.json();
      })
      .then((resData) => {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            _id: context.userId,
            title: resData.data.createEvent.title,
            descreption: resData.data.createEvent.descreption,
            price: resData.data.createEvent.price,
            date: resData.data.createEvent.date,
            createdBy: {
              _id: context.userId,
            },
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalConfirmHandler = () => {
    addEvent();
    modalRef.current.hide();
  };

  const bookingHandler = () => {
    const reqBody = {
      query: `
          mutation BookEvent($bookingId: ID!) {
            bookEvent(eventId: $bookingId) {
              createdAt
              updatedAt
            }
          }
        `,
      variables: {
        bookingId: selectedEvent._id,
      },
    };

    fetch("https://easyevents-graphql-api.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Request Failed !");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
    viewModalRef.current.hide();
  };

  const fetchEvents = () => {
    setIsLoading(true);
    const reqBody = {
      query: `
          query {
            events {
              _id
              title
              descreption
              date
              price
              createdBy{
                _id
                email
              }
            }
          }
        `,
    };

    fetch("https://easyevents-graphql-api.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Request Failed !");
        }
        return res.json();
      })
      .then((resData) => {
        const events = resData.data.events;
        setEvents(events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleViewDetail = (eventId) => {
    viewModalRef.current.show();
    const selEvent = events.find((e) => e._id === eventId);
    setSelectedEvent(selEvent);
  };

  const handleSelectDate = (date) => {
    dateRef.current.value = date;
    datePickerRef.current.hide();
  };

  const handleSetTime = (hour, min, isAm) => {
    timeRef.current.value = `${hour}:${min}${isAm ? "AM" : "PM"}`;
    timePickerRef.current.hide();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <React.Fragment>
      <Modal
        ref={modalRef}
        title="Add New Event"
        setCancel
        setConfirm
        onConfirm={modalConfirmHandler}
        confirmText="Save"
      >
        <form autoComplete="off">
          <div className="add-event__input-wrapper">
            <label htmlFor="title">Title</label>
            <input ref={titleRef} type="text" id="title" />
          </div>
          <div className="add-event__input-wrapper">
            <label htmlFor="descreption">Descreption</label>
            <textarea ref={descRef} id="descreption" rows="3" />
          </div>
          <div className="add-event__input-wrapper">
            <label htmlFor="price">Price</label>
            <input ref={priceRef} type="number" id="price" />
          </div>
          <div className="add-event__input-wrapper">
            <label htmlFor="date">Date</label>
            <input
              readOnly
              ref={dateRef}
              type="text"
              id="date"
              onClick={() => {
                datePickerRef.current.show();
              }}
            />
          </div>
          <div className="add-event__input-wrapper">
            <label htmlFor="time">Time</label>
            <input
              readOnly
              ref={timeRef}
              type="text"
              id="time"
              onClick={() => {
                timePickerRef.current.show();
              }}
            />
          </div>
        </form>
      </Modal>

      <Modal
        ref={viewModalRef}
        title={selectedEvent ? selectedEvent.title : ""}
        setCancel
        setConfirm={context.token ? true : false}
        onConfirm={bookingHandler}
        confirmText="Book"
      >
        <p
          className="event__detail__desc"
          style={{ marginBottom: "0", fontWeight: "500" }}
        >
          {selectedEvent ? selectedEvent.descreption : ""}
        </p>
        <h4 className="event__detail__date" style={{ marginTop: "10px" }}>
          {selectedEvent
            ? `Date :  ${new Date(Number(selectedEvent.date)).toLocaleString()}`
            : ""}
        </h4>
      </Modal>

      <DatePicker ref={datePickerRef} onSelect={handleSelectDate} />

      <TimePicker ref={timePickerRef} onSetTime={handleSetTime} />

      {isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {events.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>No Events Yet</h2>
          ) : (
            <EventList
              events={events}
              authUserId={context.userId}
              onViewDetail={handleViewDetail}
            />
          )}
        </React.Fragment>
      )}
      {context.token && (
        <div className="event__actions">
          <button
            onClick={() => {
              modalRef.current.show();
            }}
            className="event__create__btn"
          >
            Create Event
          </button>
          <p className="event__create__text">Create Your Own Events !</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default Events;
