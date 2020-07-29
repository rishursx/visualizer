import React from "react";
import "./SortingVisualizer.css";
import getMergeSortAnimations from "../sortingAlgorithms/mergeSort";
import getSelectionSortAnimations from "../sortingAlgorithms/selectionSort";
import getBubbleSortAnimations from "../sortingAlgorithms/bubbleSort";

const minValue = 5;
<<<<<<< HEAD
const maxValue = 600;
const arraySize = 150;
const animationSpeed = 10;
const PRIMARY_COLOR = "#997920";
=======
const maxValue = 700;
const arraySize = 300;
const animationSpeed = 1;
const PRIMARY_COLOR = "aqua";
>>>>>>> c2a2b78c10491c8a2eac4c304d38ae27fce4c1d9
const SECONDARY_COLOR = "red";
const BACKGROUND_COLOR = "#203B99";

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

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColored = i % 4;
      if (isColored === 0) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * animationSpeed);
      } else if (isColored === 1 || isColored === 2) {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      } else {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = BACKGROUND_COLOR;
        }, i * animationSpeed);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    console.log(animations);
    // return;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoProp, isIdx] = animations[i];

      if (isIdx !== 1) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoProp].style;

        if (isIdx === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }, i * animationSpeed);
        }
        if (isIdx === 2) {
          setTimeout(() => {
            barOneStyle.backgroundColor = BACKGROUND_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * animationSpeed);
        }
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoProp}px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * animationSpeed);
      }
    }
    const bars = document.getElementsByClassName("array-bar");
    bars[0].style.backgroundColor = "white";
  }

  render() {
    const { array } = this.state;
    console.log(array);
    return (
      <div className="window">
        <div className="controls">
          <button onClick={() => this.resetArray()}>Generate new array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}
function getRand(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}
