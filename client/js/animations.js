const getRandomDirection = () => {
  return Math.random() < 0.5 ? 1 : -1;
};

// Function to generate a random position within the container
const getRandomPosition = (container, element) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const elementWidth = element.clientWidth;
  const elementHeight = element.clientHeight;

  const maxX = containerWidth - elementWidth;
  const maxY = containerHeight - elementHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  return { x: randomX, y: randomY };
};

// Function to move the floating element smoothly within the container
const moveFloatingElement = (
  container,
  floatingElement,
  xDirection,
  yDirection,
  speed = 1,
) => {
  const currentPosition = {
    x: parseFloat(floatingElement.style.left) || 0,
    y: parseFloat(floatingElement.style.top) || 0,
  };

  const distanceX = xDirection * speed;
  const distanceY = yDirection * speed;

  const newX = currentPosition.x + distanceX;
  const newY = currentPosition.y + distanceY;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const elementWidth = floatingElement.clientWidth;
  const elementHeight = floatingElement.clientHeight;

  // Check for collisions with the container edges
  if (newX + elementWidth > containerWidth || newX < 0) {
    xDirection *= -1; // Reverse the x-direction on collision
  }

  if (newY + elementHeight > containerHeight || newY < 0) {
    yDirection *= -1; // Reverse the y-direction on collision
  }

  const clampedX = Math.min(Math.max(newX, 0), containerWidth - elementWidth);
  const clampedY = Math.min(Math.max(newY, 0), containerHeight - elementHeight);

  floatingElement.style.left = clampedX + 'px';
  floatingElement.style.top = clampedY + 'px';
  requestAnimationFrame(() =>
    moveFloatingElement(
      container,
      floatingElement,
      xDirection,
      yDirection,
      speed,
    ),
  );
};
