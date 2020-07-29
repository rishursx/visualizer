import React from "react";
import "./SortingVisualizer.css";
import getMergeSortAnimations from "../sortingAlgorithms/mergeSort";
import getSelectionSortAnimations from "../sortingAlgorithms/selectionSort";
import getBubbleSortAnimations from "../sortingAlgorithms/bubbleSort";

const minValue = 5;
const maxValue = 700;
const arraySize = 300;
const animationSpeed = 1;
const PRIMARY_COLOR = "aqua";
const SECONDARY_COLOR = "red";
const BACKGROUND_COLOR = "blue";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      disableButtons: false,
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
    // this.setState({
    //   disableButtons: true,
    // });
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
    // this.setState({
    //   disableButtons: false,
    // });
  }

  selectionSort() {
    // this.setState({
    //   disableButtons: true,
    // });
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
    this.setState({
      disableButtons: false,
    });
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    // console.log(animations);
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
    // this.setState({
    //   disableButtons: false,
    // });
  }
  handleClick(id) {
    // this.state.disableButtons = true;
    this.setState({
      disableButtons: true,
    });
    if (id === 1) {
      this.mergeSort();
    } else if (id === 2) {
      this.selectionSort();
    } else if (id === 3) {
      this.bubbleSort();
    } else {
      this.resetArray();
    }
    this.setState({
      disableButtons: false,
    });
    // this.state.disableButtons = false;
    return;
  }
  render() {
    const { array } = this.state;
    return (
      <div className="windower">
        <div className="Histograms">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="controls">
          <button
            disabled={this.state.disableButtons}
            onClick={() => this.handleClick(0)}
          >
            Generate new array
          </button>
          <button
            disabled={this.state.disableButtons}
            onClick={() => this.handleClick(1)}
          >
            Merge Sort
          </button>
          <button
            disabled={this.state.disableButtons}
            onClick={() => this.handleClick(2)}
          >
            Selection Sort
          </button>
          <button
            disabled={this.state.disableButtons}
            onClick={() => this.handleClick(3)}
          >
            Bubble Sort
          </button>
        </div>
      </div>
    );
  }
}
function getRand(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}
