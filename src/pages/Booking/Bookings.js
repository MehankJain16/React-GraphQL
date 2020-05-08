import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import BookingList from "../../components/Bookings/BookingList/BookingList";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(AuthContext);

  const fetchBookings = (token) => {
    setIsLoading(true);
    const reqBody = {
      query: `
          query {
            bookings {
              _id
              createdAt
              updatedAt
              event{
                _id
                title
                date
              }
            }
          }
        `,
    };

    fetch("https://easyevents-graphql-api.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        const bookings = resData.data.bookings;
        setBookings(bookings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const cancelBookingHandler = (bookingId) => {
    const reqBody = {
      query: `
          mutation CancelBooking($bookingId: ID!) {
            cancelBooking(bookingId: $bookingId) {
              _id
              title
            }
          }
        `,
      variables: {
        bookingId: bookingId,
      },
    };

    fetch("https://easyevents-graphql-api.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.token}`,
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
        if (resData.data) {
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => {
              return booking._id !== bookingId;
            })
          );
        } else {
          console.log(resData.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBookings(context.token);
  }, [context.token]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {bookings.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>No Bookings Yet</h2>
          ) : (
            <BookingList bookings={bookings} onCancel={cancelBookingHandler} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Bookings;
