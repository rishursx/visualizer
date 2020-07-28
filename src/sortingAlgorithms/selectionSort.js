export default function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  //   const auxiliaryArray = array.splice();
  selectionSortTool(array, animations);
  return animations;
}

function selectionSortTool(mainArray, animations) {
  let i = 0,
    j = 0;
  for (i = 0; i < mainArray.length; i++) {
    // let smol = 1000;
    for (j = i + 1; j < mainArray.length; j++) {
      if (mainArray[i] > mainArray[j]) {
        animations.push([i, mainArray[j]]);
        animations.push([j, mainArray[i]]);
        let temp = mainArray[i];
        mainArray[i] = mainArray[j];
        mainArray[j] = temp;
      }
    }
  }
}
