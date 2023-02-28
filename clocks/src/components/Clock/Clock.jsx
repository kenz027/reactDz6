import React from "react";
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props.timeZone);
  }

  getUserDate(userTimezone) {
    const parsedUserTimezone = +Number.parseFloat(userTimezone);
    const hoursUserTimezone = Math.trunc(parsedUserTimezone);
    const minutesUserTimezone = (parsedUserTimezone % 1).toFixed(2) * 100;
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset();
    const hoursTimezoneOffset = Math.floor(timezoneOffset / 60);
    const minutesTimezoneOffset = timezoneOffset % 60;

    date.setHours(date.getHours() + hoursTimezoneOffset);
    date.setMinutes(date.getMinutes() + minutesTimezoneOffset);
    date.setHours(date.getHours() + hoursUserTimezone);
    date.setMinutes(date.getMinutes() + minutesUserTimezone);

    return date;
  }

  getInitialState(userTimezone) {
    const userDate = this.getUserDate(userTimezone);

    const hr = userDate.getHours();
    const min = userDate.getMinutes();
    const sec = userDate.getSeconds();

    const hrPosition = (hr * 360) / 12 + (min * (360 / 60)) / 12;
    const minPosition = (min * 360) / 60 + (sec * (360 / 60)) / 60;
    const secPosition = (sec * 360) / 60;

    return {
      hr: hrPosition,
      min: minPosition,
      sec: secPosition,
    };
  }
  oneTick() {
    this.setState({
      hr: this.state.hr + 3 / 360,
      min: this.state.min + 6 / 60,
      sec: this.state.sec + 6,
    });
  }
  componentDidMount() {
    this.timerI = setInterval(() => this.oneTick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerI);
  }

  render() {
    return (
      <li className="clock">
        <h2>{this.props.name}</h2>
        <div className="clock-circle">
          <span
            className="clock-circle-arrow"
            style={{ transform: `rotate(${this.state.hr}deg)` }}
          ></span>
          <span
            className="clock-circle-arrow"
            style={{ transform: `rotate(${this.state.min}deg)` }}
          ></span>
          <span
            className="clock-circle-arrow"
            style={{ transform: `rotate(${this.state.sec}deg)` }}
          ></span>
        </div>
      </li>
    );
  }
}

export default Clock;
