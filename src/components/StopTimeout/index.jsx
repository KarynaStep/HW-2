import React, { Component } from "react";
import styles from "./StopTimeout.module.css";

//переписати компонент на setTimeout замість setInterval

class StopTimeout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(0, 0, 0, 0, 0, 0), //object
    };
    this.idTimeout = null;
    this.newDate = new Date(0, 0, 0, 0, 0, 0);
  }

  tick = () => {
    this.setState((state) => {
      const { time } = state; //address
      const newTime = new Date(time); //new copy time
      newTime.setSeconds(newTime.getSeconds() + 1);
      return { time: newTime };
    });
  };

  start = () => {
    //запуск секунумера
    //setTimeout
    if (this.idTimeout === null) {
      this.tick();
    }
  };

  stop = () => {
    //зупинка секундомера
    clearTimeout(this.idTimeout);
    this.idTimeout = null;
  };

  reset = () => {
    this.stop();
    this.setState({ time: this.newDate });
  };

  componentDidMount() {}

  componentDidUpdate() {
    // побічні ефекти!!!
    // recursion
    // start
    if (this.state.time !== this.newDate) {
      this.idTimeout = setTimeout(this.tick, 1000);
    }
    
  }

  componentWillUnmount() {
    this.stop();
  }

  render() {
    const { time } = this.state;
    return (
      <article className={styles.container}>
        <h2>{time.toLocaleTimeString("en-GB")}</h2>
        <div>
          <button className={styles.btn} onClick={this.start}>
            start
          </button>
          <button className={styles.btn} onClick={this.reset}>
            reset
          </button>
          <button className={styles.btn} onClick={this.stop}>
            stop
          </button>
        </div>
      </article>
    );
  }
}

export default StopTimeout;
