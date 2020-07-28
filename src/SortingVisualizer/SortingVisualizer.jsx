import React from "react";
import "./SortingVisualizer.css";

const minValue = 5;
const maxValue = 700;
const arraySize = 300;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    // console.log("Mounted");
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < arraySize; i++) {
      //   Array[i] = () => {
      //     return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
      //   };
      array[i] = getRand(minValue, maxValue);
    }
    this.setState({ array });
  }

  render() {
    const { array } = this.state;
    console.log(array);
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate new array</button>
      </div>
    );
  }
}
function getRand(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}
