export const generateRandomCard = () => {
  return Math.floor(Math.random() * 10) + 2;
};

export const calculateScore = (arr) => {
  return arr.reduce((acc, current, index) => {
    if (index === 1 && acc === current && current === 11) return acc + 1;
    return acc + current;
  });
};
