const getRandomItemsFromArray = (array, count) => {
  const shuffledArray = [...array];

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  shuffleArray(shuffledArray);

  // Ensure count does not exceed the length of the array
  count = Math.min(count, shuffledArray.length);

  return shuffledArray.slice(0, count);
};
