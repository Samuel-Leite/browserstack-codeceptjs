// in this file you can append custom step methods to 'I' object
const { I, timeout, utils } = inject();

module.exports = function () {
  return actor({
    /**
     * return witch elemente find first
     *
     * @param {locators} locators Array of locators to try found
     * @param {int} timeoutExpected - optional, in seconds (default in capability)
     * @returns locator
     */
    async whichElementCustom(arrayLocators, timeoutExpected) {
      timeoutExpected =
        timeoutExpected == undefined ? timeout : timeoutExpected;
      let numOfElements = 0;
      let limit = 0;
      while (numOfElements == 0 && limit < timeoutExpected) {
        I.wait(1);
        for (let locator of arrayLocators) {
          numOfElements = await I.grabNumberOfVisibleElements(locator);
          if (numOfElements == 1) {
            return locator;
          }
        }
        limit++;
      }
    },
  });
};
