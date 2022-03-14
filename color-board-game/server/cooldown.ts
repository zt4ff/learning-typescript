/**
 * @description returns a function that returns true if the difference between the current time and
 *              current time and lastUpdateTime (Date.now() - lastUpdateTime)
 *              is greater than the delay in milliseconds and update the lastUpdateTime to the current time
 * @param delay in milliseconds
 */

export class CoolDown {
  private lastUpdateTime;
  private delay: number;
  constructor(delay: number) {
    this.lastUpdateTime = 0;
    this.delay = delay;
  }

  public check() {
    if (Date.now() - this.lastUpdateTime > this.delay) {
      this.lastUpdateTime = Date.now();
      return true;
    } else return false;
  }
}
