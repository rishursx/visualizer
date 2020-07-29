export default function getBubbleSortAnimation(array) {
  const animations = [];
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(array, animations) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1, 0]);
      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1], 1]);
        animations.push([j + 1, array[j], 1]);
        let temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
      animations.push([j, j + 1, 2]);
    }
  }
}
