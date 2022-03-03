/**
 * @description returns a function that returns true if the difference between the current time and
 *              current time and lastUpdateTime (Date.now() - lastUpdateTime)
 *              is greater than the delay in milliseconds and update the lastUpdateTime to the current time
 * @param delay in milliseconds
 */
export const createCooldown = (delay: number) => {
  let lastUpdateTime = 0;

  return () => {
    if (Date.now() - lastUpdateTime > delay) {
      lastUpdateTime = Date.now();
      return true;
    }
    return false;
  };
};
