import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./DatePicker.css";
import Backdrop from "../Backdrop/Backdrop";
import moment from "moment";

const DatePicker = forwardRef(({ onSelect }, ref) => {
  const [state, setState] = useState({
    dateContext: moment(),
    today: moment(),
  });
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const weekDays = moment.weekdaysShort();

  useImperativeHandle(ref, () => {
    return {
      show: () => openDatePicker(),
      hide: () => closeDatePicker(),
    };
  });

  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setDatePickerOpen(false);
  };

  const year = () => {
    return state.dateContext.format("Y");
  };
  const month = () => {
    return state.dateContext.format("MMMM");
  };
  const monthNo = (month) => {
    return moment().month(month).format("M");
  };
  const daysInMonth = () => {
    return state.dateContext.daysInMonth();
  };
  const currentDate = () => {
    return state.dateContext.get("date");
  };
  //   const currentDay = () => {
  //     return state.dateContext.format("D");
  //   };
  const firstDayOfMonth = () => {
    let dateContext = state.dateContext;
    const firstDay = moment(dateContext).startOf("month").format("d");
    return firstDay;
  };

  const prevMonth = () => {
    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    setState({ ...state, dateContext });
  };
  const nextMonth = () => {
    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    setState({ ...state, dateContext });
  };

  if (datePickerOpen) {
    let days = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      days.push(<div key={i + 100}></div>);
    }
    for (let d = 1; d <= daysInMonth(); d++) {
      days.push(
        <div
          onClick={() => {
            const date = `${d}/${monthNo(month())}/${year()}`;
            onSelect(date);
          }}
          key={d}
          className={
            d === currentDate() && state.today.format("MMMM") === month()
              ? "datepicker__days__in__month selected"
              : "datepicker__days__in__month"
          }
        >
          {d}
        </div>
      );
    }

    return ReactDOM.createPortal(
      <div className={"datepicker__wrapper"}>
        <Backdrop show={datePickerOpen} click={closeDatePicker} />
        <div className={"datepicker__modal"}>
          <div className="datepicker__months">
            <div className="prev" onClick={prevMonth}>
              <span>&#10094;</span>
            </div>
            <div className="datepicker__month__name">
              <h3>{month() + ", " + year()}</h3>
            </div>
            <div className="next" onClick={nextMonth}>
              <span>&#10095;</span>
            </div>
          </div>
          <div className="datepicker__weekdays">
            {weekDays.map((weekDay, idx) => {
              return <div key={idx}>{weekDay}</div>;
            })}
          </div>
          <div className="datepicker__days">{days}</div>
        </div>
      </div>,
      document.getElementById("datepicker-root")
    );
  }
  return null;
});

export default DatePicker;
