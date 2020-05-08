import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import "./TimePicker.css";
import Backdrop from "../Backdrop/Backdrop";

const TimePicker = forwardRef(({ onSetTime }, ref) => {
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [toShowHour, setToShowHour] = useState(true);
  const [isAmSelected, setIsAmSelected] = useState(true);
  const [selectedIndexDegree, setSelectedIndexDegree] = useState(12);
  const [hourValue, setHourValue] = useState("00");
  const [minuteValue, setMinuteValue] = useState("00");

  const mask = useRef(null);
  const hand = useRef(null);

  const handleMouseUp = (event) => {
    toShowHour ? setHour(event) : setMinute(event);
  };

  const checkForZero = (val) => {
    if (Number(val) < 10) {
      val = `0${val}`;
    }
    return val;
  };

  const setHour = (event) => {
    if (event.target.innerHTML === "12") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(-90deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "1") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(-60deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "2") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(-30deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "3") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(0deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "4") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(30deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "5") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(60deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "6") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(90deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "7") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(120deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "8") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(150deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "9") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(180deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "10") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(210deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "11") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(240deg)";
      setHourValue(checkForZero(event.target.innerHTML));
    }
  };

  const setMinute = (event) => {
    if (event.target.innerHTML === "0") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(-90deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "5") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(-60deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "10") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(-30deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "15") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(0deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "20") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(30deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "25") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(60deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "30") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(90deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "35") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(120deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "40") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(150deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "45") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(180deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "50") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(210deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
    if (event.target.innerHTML === "55") {
      setSelectedIndexDegree(Number(event.target.innerHTML));
      hand.current.style.transform = "rotateZ(240deg)";
      setMinuteValue(checkForZero(event.target.innerHTML));
    }
  };

  const clock = () => {
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const hourOrMinute = toShowHour ? hours : minutes;
    return hourOrMinute.map((i, j) => {
      //   console.log(j);
      return (
        <span
          key={j}
          className={`circle ${
            selectedIndexDegree === i ? "selected-circle" : ""
          }`}
        >
          {i}
        </span>
      );
    });
  };

  useImperativeHandle(ref, () => {
    return {
      show: () => openTimePicker(),
      hide: () => closeTimePicker(),
      hour: hourValue,
      minute: minuteValue,
      time: () => console.log(`Hour: ${hourValue} Minute: ${minuteValue}`),
    };
  });

  const openTimePicker = () => {
    setTimePickerOpen(true);
    setSelectedIndexDegree(Number(`${toShowHour ? 12 : 0}`));
  };

  const closeTimePicker = () => {
    setTimePickerOpen(false);
    setHourValue("00");
    setMinuteValue("00");
    setSelectedIndexDegree(Number(`${toShowHour ? 12 : 0}`));
    setToShowHour(true);
  };

  if (timePickerOpen) {
    return ReactDOM.createPortal(
      <div className={"timepicker-wrapper"}>
        <Backdrop show={timePickerOpen} click={closeTimePicker} />
        <div className="timepicker-modal">
          <header className="timepicker-header">
            <div className="timepicker-time-container">
              <span
                className={
                  toShowHour ? "text-shadow" : "text-shadow is-not-selected"
                }
                onClick={() => {
                  setSelectedIndexDegree(12);
                  hand.current.style.transform = "rotateZ(-90deg)";
                  setToShowHour(true);
                }}
              >
                {hourValue}
              </span>
              <span className="text-shadow">:</span>
              <span
                className={
                  toShowHour ? "text-shadow is-not-selected" : "text-shadow"
                }
                onClick={() => {
                  setSelectedIndexDegree(0);
                  hand.current.style.transform = "rotateZ(-90deg)";
                  setToShowHour(false);
                }}
              >
                {minuteValue}
              </span>
            </div>
            <div className="timepicker-am-pm-container">
              <input
                className="am-pm-input"
                type="radio"
                id="am"
                name="am-pm"
                value="am"
                onChange={() => {
                  setIsAmSelected(true);
                }}
                defaultChecked={isAmSelected}
              />
              <label className="am-pm-label" htmlFor="am">
                AM
              </label>
              <input
                className="am-pm-input"
                type="radio"
                id="pm"
                name="am-pm"
                value="pm"
                onChange={() => {
                  setIsAmSelected(false);
                }}
                defaultChecked={!isAmSelected}
              />
              <label className="am-pm-label" htmlFor="pm">
                PM
              </label>
            </div>
          </header>
          <main className="timepicker-main">
            <div
              className="clock-container"
              onMouseUp={(e) => {
                handleMouseUp(e);
              }}
              ref={mask}
            >
              <div ref={hand} className="hand" />
              {clock()}
            </div>
          </main>
          <footer className="timepicker-footer">
            <button
              className="timepicker-button close-button"
              onClick={closeTimePicker}
            >
              Close
            </button>
            <button
              className="timepicker-button"
              onClick={() => {
                // setIsSet(true);
                onSetTime(hourValue, minuteValue, isAmSelected);
              }}
            >
              Set
            </button>
          </footer>
        </div>
      </div>,
      document.getElementById("timepicker-root")
    );
  }
  return null;
});

export default TimePicker;
