const getRandomItemsFromArray = (array, count) => {
  const shuffledArray = [...array];

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  shuffleArray(shuffledArray);

  count = Math.min(count, shuffledArray.length);

  return shuffledArray.slice(0, count);
};
const getRandomItemFromArray = (array) => {
  if (array.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};
