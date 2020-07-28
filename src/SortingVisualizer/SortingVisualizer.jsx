import React from "react";
import "./SortingVisualizer.css";
import getMergeSortAnimations from "../sortingAlgorithms/sortingAlgorithms";

const minValue = 5;
const maxValue = 700;
const arraySize = 300;
const animationSpeed = 4;
const PRIMARY_COLOR = "aqua";
const SECONDARY_COLOR = "red";

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

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
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
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
      </div>
    );
  }
}
function getRand(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}
